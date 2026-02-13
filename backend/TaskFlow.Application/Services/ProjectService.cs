using AutoMapper;
using TaskFlow.Application.DTOs.Common;
using TaskFlow.Application.DTOs.Projects;
using TaskFlow.Application.Interfaces;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Interfaces;

namespace TaskFlow.Application.Services;

public class ProjectService : IProjectService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;

	public ProjectService(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}

	public async Task<Result<IEnumerable<ProjectDTO>>> GetUserProjectsAsync(int userId)
	{
		var projects = await _unitOfWork.Projects.GetProjectsByUserIdAsync(userId);
		var ProjectDTOs = _mapper.Map<IEnumerable<ProjectDTO>>(projects);
		return Result<IEnumerable<ProjectDTO>>.Success(ProjectDTOs);
	}

	public async Task<Result<ProjectDTO>> GetProjectByIdAsync(int projectId, int userId)
	{
		var project = await _unitOfWork.Projects.GetProjectWithTasksAsync(projectId, userId);

		if (project == null)
		{
			return Result<ProjectDTO>.NotFound("Project not found");
		}

		var ProjectDTO = _mapper.Map<ProjectDTO>(project);
		return Result<ProjectDTO>.Success(ProjectDTO);
	}

	public async Task<Result<ProjectDTO>> CreateProjectAsync(CreateProjectDTO dto, int userId)
	{
		var project = _mapper.Map<Project>(dto);
		project.UserId = userId;

		await _unitOfWork.Projects.AddAsync(project);
		await _unitOfWork.SaveChangesAsync();

		var ProjectDTO = _mapper.Map<ProjectDTO>(project);
		return Result<ProjectDTO>.Created(ProjectDTO);
	}

	public async Task<Result> UpdateProjectAsync(int projectId, UpdateProjectDTO dto, int userId)
	{
		var project = await _unitOfWork.Projects.FirstOrDefaultAsync(
			p => p.Id == projectId && p.UserId == userId);

		if (project == null)
		{
			return Result.NotFound("Project not found");
		}

		project.Name = dto.Name;
		project.Description = dto.Description;

		_unitOfWork.Projects.Update(project);
		await _unitOfWork.SaveChangesAsync();

		return Result.NoContent();
	}

	public async Task<Result> DeleteProjectAsync(int projectId, int userId)
	{
		var project = await _unitOfWork.Projects.FirstOrDefaultAsync(
			p => p.Id == projectId && p.UserId == userId);

		if (project == null)
		{
			return Result.NotFound("Project not found");
		}

		_unitOfWork.Projects.Remove(project);
		await _unitOfWork.SaveChangesAsync();

		return Result.NoContent();
	}
}