using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Domain.Interfaces
{
	public interface IProjectRepository : IRepository<Project>
	{
		Task<IEnumerable<Project>> GetProjectsByUserIdAsync(int userId);
		Task<Project?> GetProjectWithTasksAsync(int projectId, int userId);
		Task<bool> ProjectExistsForUserAsync(int projectId, int userId);
	}
}
