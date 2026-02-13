using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using TaskFlow.Application.DTOs.Projects;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.UnitTests.Services;

public class ProjectServiceTests
{
	private ApplicationDbContext CreateContext()
	{
		var options = new DbContextOptionsBuilder<ApplicationDbContext>()
			.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
			.Options;

		return new ApplicationDbContext(options);
	}

	[Fact]
	public async Task CreateProject_WithValidData_ReturnsCreatedProject()
	{
		// Arrange
		using var context = CreateContext();
		var user = new User
		{
			Email = "test@example.com",
			PasswordHash = "hash",
			FirstName = "Test",
			LastName = "User"
		};
		context.Users.Add(user);
		await context.SaveChangesAsync();

		var project = new Project
		{
			Name = "Test Project",
			Description = "Description",
			UserId = user.Id
		};

		// Act
		context.Projects.Add(project);
		await context.SaveChangesAsync();

		// Assert
		var savedProject = await context.Projects.FirstAsync();
		savedProject.Name.Should().Be("Test Project");
		savedProject.UserId.Should().Be(user.Id);
	}

	[Fact]
	public async Task GetProjects_ForUser_ReturnsOnlyUserProjects()
	{
		// Arrange
		using var context = CreateContext();
		var user1 = new User { Email = "user1@test.com", PasswordHash = "h", FirstName = "A", LastName = "B" };
		var user2 = new User { Email = "user2@test.com", PasswordHash = "h", FirstName = "C", LastName = "D" };
		context.Users.AddRange(user1, user2);
		await context.SaveChangesAsync();

		context.Projects.AddRange(
			new Project { Name = "User1 Project", UserId = user1.Id },
			new Project { Name = "User2 Project", UserId = user2.Id }
		);
		await context.SaveChangesAsync();

		// Act
		var user1Projects = await context.Projects
			.Where(p => p.UserId == user1.Id)
			.ToListAsync();

		// Assert
		user1Projects.Should().HaveCount(1);
		user1Projects[0].Name.Should().Be("User1 Project");
	}
}