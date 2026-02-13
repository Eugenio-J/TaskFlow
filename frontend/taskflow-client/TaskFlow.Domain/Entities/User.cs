using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Domain.Entities
{
	public class User : BaseEntity
	{
		public string Email { get; set; } = string.Empty;
		public string PasswordHash { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;

		// Navigation properties
		public ICollection<Project> Projects { get; set; } = new List<Project>();
	}
}
