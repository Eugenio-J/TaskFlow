using AutoMapper;
using TaskFlow.Application.DTOs.Common;
using TaskFlow.Application.DTOs.Tasks;
using TaskFlow.Application.Interfaces;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Interfaces;

namespace TaskFlow.Application.Services;

public class TaskService : ITaskService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public TaskService(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}

	public async Task<Result<IEnumerable<TaskDTO>>> GetTasksByProjectAsync(int projectId, int userId)
	{
		// Verify user owns the project
		var projectExists = await _unitOfWork.Projects.ProjectExistsForUserAsync(projectId, userId);
		if (!projectExists)
		{
			return Result<IEnumerable<TaskDTO>>.NotFound("Project not found");
		}

		var tasks = await _unitOfWork.Tasks.GetTasksByProjectIdAsync(projectId);
		var TaskDTOs = _mapper.Map<IEnumerable<TaskDTO>>(tasks);
		return Result<IEnumerable<TaskDTO>>.Success(TaskDTOs);
	}

	public async Task<Result<TaskDTO>> GetTaskByIdAsync(int taskId, int userId)
	{
		var task = await _unitOfWork.Tasks.GetTaskWithProjectAsync(taskId);

		if (task == null || task.Project.UserId != userId)
		{
			return Result<TaskDTO>.NotFound("Task not found");
		}

		var TaskDTO = _mapper.Map<TaskDTO>(task);
		return Result<TaskDTO>.Success(TaskDTO);
	}

	public async Task<Result<TaskDTO>> CreateTaskAsync(CreateTaskDTO dto, int userId)
	{
		// Verify user owns the project
		var projectExists = await _unitOfWork.Projects.ProjectExistsForUserAsync(dto.ProjectId, userId);
		if (!projectExists)
		{
			return Result<TaskDTO>.Failure("Invalid project", 400);
		}

		// Get max order
		var maxOrder = await _unitOfWork.Tasks.GetMaxOrderForProjectAsync(dto.ProjectId);

		var task = _mapper.Map<TaskItem>(dto);
		task.Order = maxOrder + 1;

		await _unitOfWork.Tasks.AddAsync(task);
		await _unitOfWork.SaveChangesAsync();

		var TaskDTO = _mapper.Map<TaskDTO>(task);
		return Result<TaskDTO>.Created(TaskDTO);
	}

	public async Task<Result> UpdateTaskAsync(int taskId, UpdateTaskDTO dto, int userId)
	{
		var task = await _unitOfWork.Tasks.GetTaskWithProjectAsync(taskId);

		if (task == null || task.Project.UserId != userId)
		{
			return Result.NotFound("Task not found");
		}

		task.Title = dto.Title;
		task.Description = dto.Description;
		task.Status = dto.Status;
		task.Priority = dto.Priority;
		task.DueDate = dto.DueDate;

		if (dto.Order.HasValue)
		{
			task.Order = dto.Order.Value;
		}

		_unitOfWork.Tasks.Update(task);
		await _unitOfWork.SaveChangesAsync();

		return Result.NoContent();
	}

	public async Task<Result> UpdateTaskStatusAsync(int taskId, UpdateTaskStatusDTO dto, int userId)
	{
		var task = await _unitOfWork.Tasks.GetTaskWithProjectAsync(taskId);

		if (task == null || task.Project.UserId != userId)
		{
			return Result.NotFound("Task not found");
		}

		task.Status = dto.Status;

		_unitOfWork.Tasks.Update(task);
		await _unitOfWork.SaveChangesAsync();

		return Result.NoContent();
	}

	public async Task<Result> DeleteTaskAsync(int taskId, int userId)
	{
		var task = await _unitOfWork.Tasks.GetTaskWithProjectAsync(taskId);

		if (task == null || task.Project.UserId != userId)
		{
			return Result.NotFound("Task not found");
		}

		_unitOfWork.Tasks.Remove(task);
		await _unitOfWork.SaveChangesAsync();

		return Result.NoContent();
	}
}