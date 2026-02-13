using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Application.DTOs.Projects;
using TaskFlow.Application.DTOs.Tasks;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			// Project mappings
			CreateMap<Project, ProjectDTO>()
				.ForMember(d => d.TaskCount, opt => opt.MapFrom(s => s.Tasks.Count));
			CreateMap<CreateProjectDTO, Project>();

			CreateMap<Project, ProjectDTO>()
				.ForCtorParam("Id", opt => opt.MapFrom(src => src.Id))
				.ForCtorParam("Name", opt => opt.MapFrom(src => src.Name))
				.ForCtorParam("Description", opt => opt.MapFrom(src => src.Description))
				.ForCtorParam("CreatedAt", opt => opt.MapFrom(src => src.CreatedAt))
				.ForCtorParam("TaskCount", opt => opt.MapFrom(src => src.Tasks.Count()))
				.ForCtorParam("CompletedTaskCount", opt => opt.MapFrom(src => src.Tasks.Count(t => t.Status == TaskItemStatus.Done)))
				.ForCtorParam("InProgressTaskCount", opt => opt.MapFrom(src => src.Tasks.Count(t => t.Status == TaskItemStatus.InProgress)));


			// Task mappings
			CreateMap<TaskItem, TaskDTO>();
			CreateMap<CreateTaskDTO, TaskItem>();
		}
	}
}
