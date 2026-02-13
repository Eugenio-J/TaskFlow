using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Application.DTOs.Projects
{
	public record ProjectDTO(
		int Id,
		string Name,
		string? Description,
		DateTime CreatedAt,
		int TaskCount,
		int CompletedTaskCount,
		int InProgressTaskCount
	);

	public record CreateProjectDTO(
		string Name,
		string? Description
	);

	public record UpdateProjectDTO(
		string Name,
		string? Description
	);
}
