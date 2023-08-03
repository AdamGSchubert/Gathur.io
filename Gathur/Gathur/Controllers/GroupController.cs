using Gathur.Interfaces;
using Gathur.Models;
using Gathur.Repositories;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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

		[HttpGet("allGroups")]
		public IActionResult GetAllGroups() {
			return Ok(_groupRepository.AllGroups());
		}

		[HttpGet("getByName")]
		public IActionResult GetGroupByName(string name) {
			
			Group result = _groupRepository.GetGroupbyName(name);

			if(result != null)
			{
				return Ok(result);
			}
			return BadRequest();
			
		}

		[HttpGet("getbyId")]
		public IActionResult GetGroupById(int id)
		{
			Group result = _groupRepository.GroupById(id);

			if (result != null)
			{
				return Ok(result);
			}
			return BadRequest();
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


		[HttpGet("search")]
		public IActionResult SearchGroup(string searchTerm) 
		{
			List<Group> results = _groupRepository.SearchGroups(searchTerm);

			if (results.Count > 0)
			{
				return Ok(results);
			}
			else {
				return NoContent();

			}

		}

		[Authorize]
		[HttpPost("JoinGroup")]
		public IActionResult JoinGroup(JoinedGroup newJoin) 
		{ 
			List<JoinedGroup> userGroups =_groupRepository.GetJoinedGroups(newJoin.UserId);

			bool hasJoined = userGroups.FirstOrDefault(r => r.GroupId == newJoin.GroupId) != null;

			if (!hasJoined)
			{
				_groupRepository.AddUserToGroup(newJoin);
				return Ok();
			}
			else
			{
				return BadRequest();
			}
		}

		[Authorize]
		[HttpDelete]
		public IActionResult RemoveUserGroup(JoinedGroup removeGroup) {
			_groupRepository.RemoveUserGroup(removeGroup);
			return NoContent();
		}

	}


}
