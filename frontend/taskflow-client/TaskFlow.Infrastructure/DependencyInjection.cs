using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TaskFlow.Application.Interfaces;
using TaskFlow.Domain.Interfaces;
using TaskFlow.Infrastructure.Data;
using TaskFlow.Infrastructure.Repositories;
using TaskFlow.Infrastructure.Services;

namespace TaskFlow.Infrastructure;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(
		this IServiceCollection services,
		IConfiguration configuration)
	{
		// Database
		services.AddDbContext<ApplicationDbContext>(options =>
			options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

		// Repositories
		services.AddScoped<IUnitOfWork, UnitOfWork>();
		services.AddScoped<IProjectRepository, ProjectRepository>();
		services.AddScoped<ITaskRepository, TaskRepository>();
		services.AddScoped<IUserRepository, UserRepository>();

		// Services
		services.AddScoped<ICurrentUserService, CurrentUserService>();

		return services;
	}
}