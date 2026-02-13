using System;
using System.Collections.Generic;
using System.Text;

namespace TaskFlow.Application.DTOs.Auth
{
	public record LoginDTO(string Email, string Password);

	public record RegisterDTO(
		string Email,
		string Password,
		string FirstName,
		string LastName
	);

	public record AuthResponseDTO(
		string Token,
		string Email,
		string FirstName,
		string LastName
	);
}
