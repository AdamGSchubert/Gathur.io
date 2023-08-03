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

		public PostController(IPostRepository postRepository, IUserRepository userRepository)
		{
			_postRepository = postRepository;
			_userRepository = userRepository;
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

		[HttpGet("getbyId")]
		public IActionResult GetPostbyId(int id) {
			return Ok(_postRepository.GetPostById(id));

		}


		[Authorize]
		[HttpPost]
		public IActionResult AddPost(Post post)
		{
			_postRepository.NewPost(post);
			//return CreatedAtAction(nameof(GetGroupPosts), new {id = post.Id}, post);
			return Created($"/api/post/{post.Id}", post);
		}

		[HttpDelete("PostId")]
		public IActionResult DeletePost(int PostId)
		{

			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User signedUser = _userRepository.GetByFirebaseUserId(UUID);
			var post = _postRepository.GetPostById(PostId);
			
			if (post.Author.Id == signedUser.Id)
			{
				_postRepository.DeletePost(PostId);
				return Ok(); 
			}
			else
			{
				return BadRequest();
			}


		}
		private User GetCurrentUserProfile()
		{
			var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
			return _userRepository.GetByFirebaseUserId(firebaseUserId);
		}
	}
}

