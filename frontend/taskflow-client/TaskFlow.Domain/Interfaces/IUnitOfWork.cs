using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Domain.Interfaces
{
	public interface IUnitOfWork : IDisposable
	{
		IProjectRepository Projects { get; }
		ITaskRepository Tasks { get; }
		IUserRepository Users { get; }
		Task<int> SaveChangesAsync();
	}
}
