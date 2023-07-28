using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Gathur.Interfaces;
using Gathur.Models;
using System.Collections.Generic;
using Gathur.Repositories;
using System.Security.Claims;

namespace Gathur.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly ICommentRepository _commentRepository;
		private readonly IUserRepository _userRepository;
		public CommentController(ICommentRepository commentRepository, IUserRepository userRepository)
		{
			_commentRepository = commentRepository;
			_userRepository = userRepository;
		}

		[HttpGet]
		public IActionResult GetPostComments(int postId) 
		{
			return Ok(_commentRepository.GetAllCommentsByPost(postId));
		}

		[HttpGet("commentId")]
		public IActionResult GetComment(int commentId) 
		{
			return Ok(_commentRepository.GetComment(commentId));
		}
		

		[Authorize]
		[HttpPost]
		public IActionResult PostComment(Comment comment)
		{
			//get user loggedin
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User signedUser = _userRepository.GetByFirebaseUserId(UUID);

			if (signedUser.Id == comment.AuthorId)
			{
				_commentRepository.AddComment(comment);
			return Created($"/api/comment/{comment.Id}", comment);

			}
			else
			{
				return BadRequest();
			}
			
		}

		[Authorize]
		[HttpPut]
		public IActionResult PutComment(Comment comment)
		{
			//get user loggedin
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User signedUser = _userRepository.GetByFirebaseUserId(UUID);
			if(signedUser.Id== comment.AuthorId) 
			{
			_commentRepository.AddComment(comment);
			return Ok();
			}
			else { return BadRequest(); }
			
		}

		[Authorize]
		[HttpDelete]
		public IActionResult DeleteComment(int commentId)
		{
			//get user loggedin
			string UUID = User.FindFirstValue(ClaimTypes.NameIdentifier);

			User signedUser = _userRepository.GetByFirebaseUserId(UUID);

			Comment comment = _commentRepository.GetComment(commentId);

			if (signedUser.Id == comment.AuthorId)
			{
				_commentRepository.AddComment(comment);
				return Ok();
			}
			else { return BadRequest(); }
		}
	}
}
