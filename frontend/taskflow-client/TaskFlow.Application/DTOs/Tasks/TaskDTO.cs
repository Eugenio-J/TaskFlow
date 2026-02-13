using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Application.DTOs.Tasks
{
	public record TaskDTO(
	int Id,
	string Title,
	string? Description,
	TaskItemStatus Status,
	TaskPriority Priority,
	DateTime? DueDate,
	int ProjectId,
	int Order,
	DateTime CreatedAt
);

	public record CreateTaskDTO(
		string Title,
		string? Description,
		TaskPriority Priority,
		DateTime? DueDate,
		int ProjectId
	);

	public record UpdateTaskDTO(
		string Title,
		string? Description,
		TaskItemStatus Status,
		TaskPriority Priority,
		DateTime? DueDate,
		int? Order
	);

	public record UpdateTaskStatusDTO(
	TaskItemStatus Status
	);
}
