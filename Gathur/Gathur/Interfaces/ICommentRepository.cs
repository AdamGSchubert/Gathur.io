using Gathur.Models;
using System.Collections.Generic;

namespace Gathur.Interfaces
{
	public interface ICommentRepository
	{
		//get all 
		List<Comment> GetAllCommentsByPost(int postId);


		Comment GetComment(int commentId);
		void DeleteComment(int commentId);

		//create
		void AddComment(Comment newComment);

		void UpdateComment(Comment newComment);

	}
}
