using Gathur.Services;
using Gathur.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


namespace Gathur.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ZipCodeController : ControllerBase
	{
		
		private readonly IZipcodeService _zipcodeService;

		public ZipCodeController(IZipcodeService zipcodeService)
		{
			_zipcodeService = zipcodeService;
		}
		
		[HttpGet]
		public IActionResult GetZipcodeRadius(int zip, int radius)
		{
			List<ZipcodeCheck> data = _zipcodeService.GetZipsAsync(zip, radius);
			return Ok(data);
		}
	}
}
