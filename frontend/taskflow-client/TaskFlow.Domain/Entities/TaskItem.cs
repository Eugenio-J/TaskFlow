using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Enums;

namespace TaskFlow.Domain.Entities
{
	public class TaskItem : BaseEntity
	{
		public string Title { get; set; } = string.Empty;
		public string? Description { get; set; }
		public TaskItemStatus Status { get; set; } = TaskItemStatus.Todo;
		public TaskPriority Priority { get; set; } = TaskPriority.Medium;
		public DateTime? DueDate { get; set; }
		public int ProjectId { get; set; }
		public int Order { get; set; }

		// Navigation property
		public Project Project { get; set; } = null!;
	}
}
