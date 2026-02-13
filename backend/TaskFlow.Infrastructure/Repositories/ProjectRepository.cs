using Microsoft.EntityFrameworkCore;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Interfaces;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class ProjectRepository : GenericRepository<Project>, IProjectRepository
{
	public ProjectRepository(ApplicationDbContext context) : base(context)
	{
	}

	public async Task<IEnumerable<Project>> GetProjectsByUserIdAsync(int userId)
	{
		return await _dbSet
			.Include(p => p.Tasks)
			.Where(p => p.UserId == userId)
			.OrderByDescending(p => p.CreatedAt)
			.ToListAsync();
	}

	public async Task<Project?> GetProjectWithTasksAsync(int projectId, int userId)
	{
		return await _dbSet
			.Include(p => p.Tasks)
			.FirstOrDefaultAsync(p => p.Id == projectId && p.UserId == userId);
	}

	public async Task<bool> ProjectExistsForUserAsync(int projectId, int userId)
	{
		return await _dbSet.AnyAsync(p => p.Id == projectId && p.UserId == userId);
	}
}