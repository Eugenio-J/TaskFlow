using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Application.DTOs.Common;
using TaskFlow.Application.DTOs.Tasks;

namespace TaskFlow.Application.Interfaces
{
	public interface ITaskService
	{
		Task<Result<IEnumerable<TaskDTO>>> GetTasksByProjectAsync(int projectId, int userId);
		Task<Result<TaskDTO>> GetTaskByIdAsync(int taskId, int userId);
		Task<Result<TaskDTO>> CreateTaskAsync(CreateTaskDTO dto, int userId);
		Task<Result> UpdateTaskAsync(int taskId, UpdateTaskDTO dto, int userId);
		Task<Result> UpdateTaskStatusAsync(int taskId, UpdateTaskStatusDTO dto, int userId);
		Task<Result> DeleteTaskAsync(int taskId, int userId);
	}
}
