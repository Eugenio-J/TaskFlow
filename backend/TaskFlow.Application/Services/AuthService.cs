using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskFlow.Application.DTOs.Auth;
using TaskFlow.Application.DTOs.Common;
using TaskFlow.Application.Interfaces;
using TaskFlow.Domain.Entities;
using TaskFlow.Domain.Interfaces;
using BC = BCrypt.Net.BCrypt;

namespace TaskFlow.Application.Services;

public class AuthService : IAuthService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IConfiguration _configuration;

	public AuthService(IUnitOfWork unitOfWork, IConfiguration configuration)
	{
		_unitOfWork = unitOfWork;
		_configuration = configuration;
	}

	public async Task<Result<AuthResponseDTO>> LoginAsync(LoginDTO dto)
	{
		var user = await _unitOfWork.Users.GetByEmailAsync(dto.Email);

		if (user == null || !BC.Verify(dto.Password, user.PasswordHash))
		{
			return Result<AuthResponseDTO>.Unauthorized("Invalid email or password");
		}

		var token = GenerateJwtToken(user);
		var response = new AuthResponseDTO(token, user.Email, user.FirstName, user.LastName);

		return Result<AuthResponseDTO>.Success(response);
	}

	public async Task<Result<AuthResponseDTO>> RegisterAsync(RegisterDTO dto)
	{
		// Check if email exists
		if (await _unitOfWork.Users.EmailExistsAsync(dto.Email))
		{
			return Result<AuthResponseDTO>.Failure("Email already registered", 400);
		}

		var user = new User
		{
			Email = dto.Email,
			PasswordHash = BC.HashPassword(dto.Password),
			FirstName = dto.FirstName,
			LastName = dto.LastName
		};

		await _unitOfWork.Users.AddAsync(user);
		await _unitOfWork.SaveChangesAsync();

		var token = GenerateJwtToken(user);
		var response = new AuthResponseDTO(token, user.Email, user.FirstName, user.LastName);

		return Result<AuthResponseDTO>.Created(response);
	}

	private string GenerateJwtToken(User user)
	{
		var key = new SymmetricSecurityKey(
			Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!));

		var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email),
			new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
		};

		var token = new JwtSecurityToken(
			issuer: _configuration["Jwt:Issuer"],
			audience: _configuration["Jwt:Audience"],
			claims: claims,
			expires: DateTime.UtcNow.AddMinutes(
				int.Parse(_configuration["Jwt:ExpirationInMinutes"]!)),
			signingCredentials: credentials
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}