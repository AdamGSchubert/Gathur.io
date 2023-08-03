using Gathur.Interfaces;
using Gathur.Models;
using Gathur.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace Gathur.Repositories
{
	public class CommentRepository : BaseRepository, ICommentRepository
	{
		public CommentRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public List<Comment> GetAllCommentsByPost(int postId)
		{
			using (var conn= Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Comment.Id, PostId, AuthorId,Content, SubmitTime,EditTime,
										UserName, AvatarImageUrl
										from Comment
										join [User] on Comment.AuthorId =[User].Id
										where PostId =@id
										order by SubmitTime desc";
					DbUtils.AddParameter(cmd, "@id", postId);

					var reader = cmd.ExecuteReader();
					List<Comment> comments = new List<Comment>();
					while (reader.Read()) 
					{
						comments.Add(new Comment()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							PostId = DbUtils.GetInt(reader, "PostId"),
							Content = DbUtils.GetString(reader, "Content"),
							AuthorId = DbUtils.GetInt(reader,"AuthorId"),
							Author = new User()
							{
								UserName = DbUtils.GetString(reader, "UserName"),
								AvatarImgUrl = DbUtils.GetString(reader, "AvatarImageUrl")
							},
							SubmitTime =DbUtils.GetDateTime(reader,"SubmitTime"),
							EditTime =DbUtils.GetNullableDateTime(reader,"EditTime")
						});
											
					}
					return comments;

				}
				
			}
		}

		public Comment GetComment(int commentId)
		{
			using (var conn= Connection)
			{
				conn.Open();
				using ( var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, PostId, AuthorId, Content, SubmitTime, EditTime
										from Comment
										where Id=@id";
					DbUtils.AddParameter(cmd, "@id", commentId);
					var reader = cmd.ExecuteReader();
					Comment comment = null;
					if (reader.Read())
					{
						comment = new Comment()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							PostId = DbUtils.GetInt(reader, "PostId"),
							AuthorId = DbUtils.GetInt(reader, "AuthorId"),
							Content = DbUtils.GetString(reader, "Content"),
							SubmitTime = DbUtils.GetDateTime(reader, "SubmitTime"),
							EditTime = DbUtils.GetNullableDateTime(reader, "EditTime")
						};
					}
					return comment;
				}
			}
		}
		public void AddComment(Comment newComment)
		{
			using (var conn= Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"insert into Comment
										( PostId, AuthorId, Content,SubmitTime)
										output inserted.Id
										Values (@postId, @authorId, @content, @submitTime)";
					DbUtils.AddParameter(cmd, "@postId", newComment.PostId);
					DbUtils.AddParameter(cmd, "@authorId", newComment.AuthorId);
					DbUtils.AddParameter(cmd, "@content", newComment.Content);
					DbUtils.AddParameter(cmd, "@submitTime", DateTime.Now);

					cmd.ExecuteScalar();
				}
			}
		}

		public void UpdateComment(Comment newComment)
		{
			using (var conn= Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"update Comment
										set Content = @content,
											EditTime = @edit
											where Id = @id";

					DbUtils.AddParameter(cmd, "@id", newComment.Id);
					DbUtils.AddParameter(cmd, "@content", newComment.Content);
					DbUtils.AddParameter(cmd, "@edit", DateTime.Now);

					cmd.ExecuteNonQuery();
				}
			}
		}

		public void DeleteComment(int commentId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using(var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"Delete from Comment
										where Id= @id";
					DbUtils.AddParameter(cmd, "@id", commentId);

					cmd.ExecuteNonQuery();
				}
			}
		}

		
	}
}
