using FluentValidation;
using TaskFlow.Application.DTOs.Projects;

namespace TaskFlow.Application.Validators;

public class CreateProjectValidator : AbstractValidator<CreateProjectDTO>
{
	public CreateProjectValidator()
	{
		RuleFor(x => x.Name)
			.NotEmpty().WithMessage("Project name is required")
			.MaximumLength(100).WithMessage("Project name cannot exceed 100 characters");

		RuleFor(x => x.Description)
			.MaximumLength(500).WithMessage("Description cannot exceed 500 characters");
	}
}

public class UpdateProjectValidator : AbstractValidator<UpdateProjectDTO>
{
	public UpdateProjectValidator()
	{
		RuleFor(x => x.Name)
			.NotEmpty().WithMessage("Project name is required")
			.MaximumLength(100).WithMessage("Project name cannot exceed 100 characters");

		RuleFor(x => x.Description)
			.MaximumLength(500).WithMessage("Description cannot exceed 500 characters");
	}
}