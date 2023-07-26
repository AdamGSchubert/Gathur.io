using Azure.Identity;
using Gathur.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Gathur.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Data.SqlTypes;

namespace Gathur.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		public UserController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		private User GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userRepository.GetByFirebaseUserId(firebaseUserId);
		}
		
		[HttpGet("DoesUserExist/{firebaseUserId}")]
		public IActionResult DoesUserExist(string firebaseUserId)
		{
			var userProfile = _userRepository.GetByFirebaseUserId(firebaseUserId);
			if (userProfile == null)
			{
				return NotFound();
			}
			return Ok();
		}

		[Authorize]
		[HttpGet]
		public IActionResult login(string username)
		{
			return Ok(_userRepository.GetUser(username));
		}

		[HttpPost]
		public IActionResult Register(User newUser)
		{
			
			_userRepository.register(newUser);
			return CreatedAtAction(
				nameof(login)
				,newUser);
		}



	} }

	//login takes a username returns user if match 
	/* take user.password 
	 *  now login has password (in sha256) 
	 *  if password passed in is same as user.password
	 *  return user
	 * 
	 * 

	//does user exist
	// if not send to register
	//get user if username exists
	//check username.password is correct?
	// if username and username.password is correct return ok()


}
	*/