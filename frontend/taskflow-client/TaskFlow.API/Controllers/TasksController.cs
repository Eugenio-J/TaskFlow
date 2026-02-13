using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.DTOs.Tasks;
using TaskFlow.Application.Interfaces;

namespace TaskFlow.API.Controllers;

[Authorize]
public class TasksController : BaseApiController
{
	private readonly ITaskService _taskService;

	public TasksController(ITaskService taskService)
	{
		_taskService = taskService;
	}

	[HttpGet("/api/projects/{projectId}/tasks")]
	public async Task<IActionResult> GetTasksByProject(int projectId)
	{
		var result = await _taskService.GetTasksByProjectAsync(projectId, GetUserId());
		return HandleResult(result);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetTask(int id)
	{
		var result = await _taskService.GetTaskByIdAsync(id, GetUserId());
		return HandleResult(result);
	}

	[HttpPost]
	public async Task<IActionResult> CreateTask(CreateTaskDTO DTO)
	{
		var result = await _taskService.CreateTaskAsync(DTO, GetUserId());
		return HandleResult(result);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateTask(int id, UpdateTaskDTO DTO)
	{
		var result = await _taskService.UpdateTaskAsync(id, DTO, GetUserId());
		return HandleResult(result);
	}

	[HttpPatch("{id}/status")]
	public async Task<IActionResult> UpdateTaskStatus(int id, UpdateTaskStatusDTO DTO)
	{
		var result = await _taskService.UpdateTaskStatusAsync(id, DTO, GetUserId());
		return HandleResult(result);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteTask(int id)
	{
		var result = await _taskService.DeleteTaskAsync(id, GetUserId());
		return HandleResult(result);
	}
}