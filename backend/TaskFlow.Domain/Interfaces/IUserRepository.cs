using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Domain.Interfaces
{
	public interface IUserRepository : IRepository<User>
	{
		Task<User?> GetByEmailAsync(string email);
		Task<bool> EmailExistsAsync(string email);
	}
}
