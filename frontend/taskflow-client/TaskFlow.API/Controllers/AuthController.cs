using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.DTOs.Auth;
using TaskFlow.Application.Interfaces;

namespace TaskFlow.API.Controllers;

public class AuthController : BaseApiController
{
	private readonly IAuthService _authService;

	public AuthController(IAuthService authService)
	{
		_authService = authService;
	}

	[HttpPost("register")]
	public async Task<IActionResult> Register(RegisterDTO dto)
	{
		var result = await _authService.RegisterAsync(dto);
		return HandleResult(result);
	}

	[HttpPost("login")]
	public async Task<IActionResult> Login(LoginDTO dto)
	{
		var result = await _authService.LoginAsync(dto);
		return HandleResult(result);
	}
}