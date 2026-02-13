// Controllers/HealthController.cs
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
	[HttpGet]
	public IActionResult Check() => Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
}