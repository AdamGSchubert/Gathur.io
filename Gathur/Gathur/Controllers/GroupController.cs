using Gathur.Interfaces;
using Gathur.Models;
using Gathur.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace Gathur.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class GroupController : ControllerBase
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IUserRepository _userRepository;
		

		public GroupController(IGroupRepository groupRepository, IUserRepository userRepository
			)
		{
			_groupRepository = groupRepository;
			_userRepository = userRepository;
			
		}

		[Authorize]
		[HttpGet]
		public IActionResult GetMyGroups()
		{
			//get signedIn user
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);
			
			User signedUser = _userRepository.GetByFirebaseUserId(UUID);
			//get signedIn users joined groups list
			return Ok(_groupRepository.UserGroups(signedUser.Id));
		}

		[Authorize]
		[HttpPost]
		public IActionResult AddGroup(Group group)
		{
			//get signedIn user
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User signedUser = _userRepository.GetByFirebaseUserId(UUID);
			
			//create the group
			_groupRepository.MakeAGroup(group);

			//then add user signed in user as admin of new group
			_groupRepository.AddUserToGroupAdmin(group.Id, signedUser.Id);

			//return created for the group
			return Created($"/api/group/{group.Id}", group);
		}

		[Authorize]
		[HttpPut]
		public IActionResult UpdateGroup(Group group)
		{
			//get signedIn user
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User userProfile = _userRepository.GetByFirebaseUserId(UUID);

			List<GroupAdmin> admins = _groupRepository.GetGroupAdmins(group.Id);

			//iterate through list to check if userId matches an admin
			if (admins.Exists(a => (a.UserId == userProfile.Id)))
			{//match
				_groupRepository.UpdateGroup(group);
				return NoContent();
			}
			else
			{//no match
				return BadRequest();
			}

		}
	}
}
