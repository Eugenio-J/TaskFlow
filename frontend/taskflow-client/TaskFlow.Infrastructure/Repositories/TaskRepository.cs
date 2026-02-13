using Microsoft.EntityFrameworkCore;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Interfaces;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class TaskRepository : GenericRepository<TaskItem>, ITaskRepository
{
	public TaskRepository(ApplicationDbContext context) : base(context)
	{
	}

	public async Task<IEnumerable<TaskItem>> GetTasksByProjectIdAsync(int projectId)
	{
		return await _dbSet
			.Where(t => t.ProjectId == projectId)
			.OrderBy(t => t.Order)
			.ThenByDescending(t => t.CreatedAt)
			.ToListAsync();
	}

	public async Task<TaskItem?> GetTaskWithProjectAsync(int taskId)
	{
		return await _dbSet
			.Include(t => t.Project)
			.FirstOrDefaultAsync(t => t.Id == taskId);
	}

	public async Task<int> GetMaxOrderForProjectAsync(int projectId)
	{
		var maxOrder = await _dbSet
			.Where(t => t.ProjectId == projectId)
			.Select(t => (int?)t.Order)
			.MaxAsync();

		return maxOrder ?? -1;
	}
}