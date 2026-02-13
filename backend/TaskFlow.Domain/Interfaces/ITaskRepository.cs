using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Domain.Interfaces
{
	public interface ITaskRepository : IRepository<TaskItem>
	{
		Task<IEnumerable<TaskItem>> GetTasksByProjectIdAsync(int projectId);
		Task<TaskItem?> GetTaskWithProjectAsync(int taskId);
		Task<int> GetMaxOrderForProjectAsync(int projectId);
	}
}
