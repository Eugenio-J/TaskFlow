using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using TaskFlow.Application.Interfaces;
using TaskFlow.Application.Mappings;
using TaskFlow.Application.Services;

namespace TaskFlow.Application;

public static class DependencyInjection
{
	public static IServiceCollection AddApplication(this IServiceCollection services)
	{
		// AutoMapper
		services.AddAutoMapper(typeof(MappingProfile));

		// FluentValidation
		services.AddValidatorsFromAssemblyContaining<MappingProfile>();

		// Services
		services.AddScoped<IProjectService, ProjectService>();
		services.AddScoped<ITaskService, TaskService>();
		services.AddScoped<IAuthService, AuthService>();

		return services;
	}
}