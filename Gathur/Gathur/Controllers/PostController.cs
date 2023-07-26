using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Gathur.Interfaces;
using Gathur.Models;
using System.Security.Claims;

namespace Gathur.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostController : ControllerBase

	{
		private readonly IPostRepository _postRepository;
		private readonly IUserRepository _userRepository;

		public PostController(IPostRepository postRepository)
		{
			_postRepository = postRepository;
		}

		[HttpGet("{GroupId}")]
		public IActionResult GetGroupPosts(int GroupId)
		{
			return Ok(_postRepository.GetAllPostsByGroupId(GroupId));
		}
		[HttpGet]
		public IActionResult GetRandomPosts()
		{
			return Ok(_postRepository.GetRandomPosts());
		}
		[Authorize]
		[HttpPost]
		public IActionResult AddPost(Post post)
		{
			_postRepository.NewPost(post);
			//return CreatedAtAction(nameof(GetGroupPosts), new {id = post.Id}, post);
			return Created($"/api/post/{post.Id}", post);
		}

		//[HttpDelete("PostId")]
		//public IActionResult DeletePost(int PostId) 
		//{
		//	var post =_postRepository.GetPostById(PostId);
		//	var user = _userRepository.GetUser(username);
		//	if (post.Author.Id == user.Id ) 
		//	{
		//		_postRepository.DeletePost(PostId);
		//	}


		//}
		private User GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}

