using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Application.DTOs.Tasks;

namespace TaskFlow.Application.Validators
{
	public class CreateTaskValidator : AbstractValidator<CreateTaskDTO>
	{
		public CreateTaskValidator()
		{
			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Task title is required")
				.MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

			RuleFor(x => x.Description)
				.MaximumLength(1000).WithMessage("Description cannot exceed 1000 characters");

			RuleFor(x => x.ProjectId)
				.GreaterThan(0).WithMessage("Valid project is required");
		}
	}

	public class UpdateTaskValidator : AbstractValidator<UpdateTaskDTO>
	{
		public UpdateTaskValidator()
		{
			RuleFor(x => x.Title)
				.NotEmpty().WithMessage("Task title is required")
				.MaximumLength(200).WithMessage("Title cannot exceed 200 characters");

			RuleFor(x => x.Description)
				.MaximumLength(1000).WithMessage("Description cannot exceed 1000 characters");

			RuleFor(x => x.Status)
				.IsInEnum().WithMessage("Invalid status");

			RuleFor(x => x.Priority)
				.IsInEnum().WithMessage("Invalid priority");
		}
	}
}
