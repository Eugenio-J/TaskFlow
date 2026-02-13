using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.DTOs.Projects;
using TaskFlow.Application.Interfaces;

namespace TaskFlow.API.Controllers;

[Authorize]
public class ProjectsController : BaseApiController
{
	private readonly IProjectService _projectService;

	public ProjectsController(IProjectService projectService)
	{
		_projectService = projectService;
	}

	[HttpGet]
	public async Task<IActionResult> GetProjects()
	{
		var result = await _projectService.GetUserProjectsAsync(GetUserId());
		return HandleResult(result);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetProject(int id)
	{
		var result = await _projectService.GetProjectByIdAsync(id, GetUserId());
		return HandleResult(result);
	}

	[HttpPost]
	public async Task<IActionResult> CreateProject(CreateProjectDTO DTO)
	{
		var result = await _projectService.CreateProjectAsync(DTO, GetUserId());
		return HandleResult(result);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdateProject(int id, UpdateProjectDTO DTO)
	{
		var result = await _projectService.UpdateProjectAsync(id, DTO, GetUserId());
		return HandleResult(result);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeleteProject(int id)
	{
		var result = await _projectService.DeleteProjectAsync(id, GetUserId());
		return HandleResult(result);
	}
}