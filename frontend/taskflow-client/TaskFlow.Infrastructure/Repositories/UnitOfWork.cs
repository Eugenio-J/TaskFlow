using TaskFlow.Domain.Interfaces;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
	private readonly ApplicationDbContext _context;

	private IProjectRepository? _projects;
	private ITaskRepository? _tasks;
	private IUserRepository? _users;

	public UnitOfWork(ApplicationDbContext context)
	{
		_context = context;
	}

	public IProjectRepository Projects =>
		_projects ??= new ProjectRepository(_context);

	public ITaskRepository Tasks =>
		_tasks ??= new TaskRepository(_context);

	public IUserRepository Users =>
		_users ??= new UserRepository(_context);

	public async Task<int> SaveChangesAsync()
	{
		return await _context.SaveChangesAsync();
	}

	public void Dispose()
	{
		_context.Dispose();
	}
}