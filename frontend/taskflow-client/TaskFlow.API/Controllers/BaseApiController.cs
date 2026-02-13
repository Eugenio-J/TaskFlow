using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskFlow.Application.DTOs.Common;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseApiController : ControllerBase
{
	protected int GetUserId()
	{
		var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
		return int.Parse(userIdClaim!);
	}

	protected IActionResult HandleResult<T>(Result<T> result)
	{
		if (result.IsSuccess)
		{
			return result.StatusCode switch
			{
				201 => CreatedAtAction(null, result.Data),
				204 => NoContent(),
				_ => Ok(result.Data)
			};
		}

		return result.StatusCode switch
		{
			401 => Unauthorized(new { message = result.Error }),
			404 => NotFound(new { message = result.Error }),
			_ => BadRequest(new { message = result.Error })
		};
	}

	protected IActionResult HandleResult(Result result)
	{
		if (result.IsSuccess)
		{
			return result.StatusCode == 204 ? NoContent() : Ok();
		}

		return result.StatusCode switch
		{
			401 => Unauthorized(new { message = result.Error }),
			404 => NotFound(new { message = result.Error }),
			_ => BadRequest(new { message = result.Error })
		};
	}
}