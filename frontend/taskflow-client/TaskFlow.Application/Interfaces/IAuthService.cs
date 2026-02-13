using System;
using System.Collections.Generic;
using System.Text;
using TaskFlow.Application.DTOs.Auth;
using TaskFlow.Application.DTOs.Common;

namespace TaskFlow.Application.Interfaces
{
	public interface IAuthService
	{
		Task<Result<AuthResponseDTO>> LoginAsync(LoginDTO dto);
		Task<Result<AuthResponseDTO>> RegisterAsync(RegisterDTO dto);
	}
}
