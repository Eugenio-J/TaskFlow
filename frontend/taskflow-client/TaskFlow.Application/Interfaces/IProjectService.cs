using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Application.DTOs.Common;
using TaskFlow.Application.DTOs.Projects;

namespace TaskFlow.Application.Interfaces
{
	public interface IProjectService
	{
		Task<Result<IEnumerable<ProjectDTO>>> GetUserProjectsAsync(int userId);
		Task<Result<ProjectDTO>> GetProjectByIdAsync(int projectId, int userId);
		Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO dto, int userId);
		Task<Result> UpdateProjectAsync(int projectId, UpdateProjectDTO dto, int userId);
		Task<Result> DeleteProjectAsync(int projectId, int userId);
	}
}
