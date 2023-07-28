using Gathur.Utils;
using Gathur.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Gathur.Interfaces;
using System;
using System.Text.RegularExpressions;
using Group = Gathur.Models.Group;
using Microsoft.Extensions.Hosting;

namespace Gathur.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
	{
		public PostRepository(IConfiguration configuration) : base(configuration)
		{ //pass the connection string from the base repository, then inhertit the variables/methods set
		}

		public List<Post> GetAllPostsByGroupId(int groupId)
		{
			using (var conn = Connection)// use the connection defined in the base 
			{
				conn.Open(); //open the connection to the DB
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Post.Id as PostId, UserName, GroupId, Title, Content, Post.PostTypeId, PostType.Name as PostTypeName, SubmitTime, MeetingZip, Address,
										EditTime,[User].Id as UserId  
										from Post
										join [User] on Post.AuthorId = [User].Id
										join PostType on Post.PostTypeId = PostType.Id
										where GroupId = @id
										Order by SubmitTime desc";

					cmd.Parameters.AddWithValue("@id", groupId);

					var reader = cmd.ExecuteReader();
					var posts = new List<Post>();

					while (reader.Read())
					{
						posts.Add(new Post()
						{
							Id = DbUtils.GetInt(reader, "PostId"),
							Title = DbUtils.GetString(reader, "Title"),
							Content = DbUtils.GetString(reader, "Content"),
							Author = new User()
							{
								Id = DbUtils.GetInt(reader, "UserId"),
								UserName = DbUtils.GetString(reader, "UserName")
							},
							SubmitTime = DbUtils.GetDateTime(reader, "SubmitTime"),
							EditTime = DbUtils.GetNullableDateTime(reader, "EditTime"),
							Address = DbUtils.GetString(reader, "Address"),
						    Zipcode = DbUtils.GetNullableInt(reader,"MeetingZip"),
							PostType = new PostType()
							{
							Id = DbUtils.GetInt(reader, "PostTypeId"),
							Name = DbUtils.GetString(reader, "PostTypeName")
							}
					});
					}
					return posts;
				}

			}
		}

		public List<Post> GetRandomPosts()
		{
			using (var conn = Connection) 
			{
				conn.Open();
				using (var cmd =conn.CreateCommand()) 
				{ 
					cmd.CommandText = @"  select top 5 Post.Id as PostId, UserName, GroupId, Title, Content, PostType.Name, SubmitTime, MeetingZip, Address,
										EditTime, [User].Id as UserId, [Group].[Name] as GroupName 
										from Post
										join [User] on Post.AuthorId = [User].Id
										join PostType on Post.PostTypeId = PostType.Id
										join [Group] on Post.GroupId = [Group].Id
										where PostTypeId !=2
										order by NEWID()";
					var reader = cmd.ExecuteReader();
					var posts = new List<Post>();

					while (reader.Read())
					{
						posts.Add(new Post()
						{
							Id = DbUtils.GetInt(reader, "PostId"),
							Title = DbUtils.GetString(reader, "Title"),
							Content = DbUtils.GetString(reader, "Content"),
							Author = new User()
							{
								Id = DbUtils.GetInt(reader, "UserId"),
								UserName = DbUtils.GetString(reader, "UserName")
							},
							SubmitTime = DbUtils.GetDateTime(reader, "SubmitTime"),
							EditTime = DbUtils.GetNullableDateTime(reader, "EditTime"),
							Group = new Group()
							{
								Id = DbUtils.GetInt(reader,"GroupId"),
								Name = DbUtils.GetString(reader,"GroupName"),

							}

						});
					}
					return posts;
				}
			}
		}

		public Post GetPostById(int id)
		{
			using (var conn = Connection) 
			{
			conn.Open();
			using ( var cmd =conn.CreateCommand())
				{
					cmd.CommandText = @"select Post.Id as PostId, UserName, GroupId, Title, Content, PostType.Name as PostTypeName, SubmitTime, MeetingZip, Address,
										EditTime,[User].Id as UserId, Group.Name as GroupName, PostType.Id as PostTypeId
										from Post
										join [User] on Post.AuthorId = [User].Id
										join PostType on Post.PostTypeId = PostType.Id
										join Group on Post.GroupId= Group.Id
										where Post.Id = @id";
					cmd.Parameters.AddWithValue("@id", id);

					var reader = cmd.ExecuteReader();

					var post = new Post();
					if (reader.Read())
					{


						post.Id = DbUtils.GetInt(reader, "PostId");
						post.Title = DbUtils.GetString(reader, "Title");
						post.Content = DbUtils.GetString(reader, "Content");
						post.Group = new Group()
						{
							Id = DbUtils.GetInt(reader,"GroupId"),
							Name =DbUtils.GetString(reader,"GroupName")
						};
						post.Author = new User()
						{
							Id = DbUtils.GetInt(reader, "UserId"),
							UserName = DbUtils.GetString(reader, "UserName")
						};
						post.SubmitTime = DbUtils.GetDateTime(reader, "SubmitTime");
						post.EditTime = DbUtils.GetNullableDateTime(reader, "EditTime");
						post.Address = DbUtils.GetString(reader, "address");
						post.Zipcode = DbUtils.GetInt(reader, "MeetingZip");
						post.PostType = new PostType()
						{
							Id = DbUtils.GetInt(reader, "PostTypeId"),
							Name = DbUtils.GetString(reader, "PostTypeName")
						};

					}
					return post;
				}

			
			}
		}
		//create
		public void NewPost(Post post)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"insert into [Post] (AuthorId,GroupId,Title,Content,PostTypeId,SubmitTime,MeetingZip,[Address])
									output inserted.Id
									values ( @authorId,@groupId,
											@title,
											@content,
											@postTypeId,
											@submitTime,
											@meetingZip,
											@address)";
					DbUtils.AddParameter(cmd, "@authorId", post.AuthorId);
					DbUtils.AddParameter(cmd, "@groupId", post.GroupId);
					DbUtils.AddParameter(cmd, "@title", post.Title);
					DbUtils.AddParameter(cmd, "@content", post.Content);
					//DbUtils.AddParameter(cmd, "@tagId", post.TagId);
					DbUtils.AddParameter(cmd, "@postTypeId", post.PostTypeId);
					DbUtils.AddParameter(cmd, "@submitTime", DateTime.Now);
					DbUtils.AddParameter(cmd, "@meetingZip", post.Zipcode);
					DbUtils.AddParameter(cmd, "@address", post.Address);

					post.Id = (int)cmd.ExecuteScalar();
				}

			}	
		}
		//delete
		public void DeletePost(int postId) 
		{
			using (var conn = Connection) 
			{
				conn.Open();
				using(var cmd = conn.CreateCommand()) 
				{
					cmd.CommandText = @"delete from Post
										where Id = @id";

					DbUtils.AddParameter(cmd, "@id", postId);

					cmd.ExecuteNonQuery();
				
				}
			}
		}
		//update
		public void UpdatePost(int id, Post post)
		{
			using (var conn = Connection) 
			{
				conn.Open();
				using( var cmd = conn.CreateCommand()) 
				{
					cmd.CommandText = @"Update Post
									Set AuthorId = @authorId,
									GroupId = @groupId,
									Title = @title,
									Content = @content,
									PostTypeId = @posttype,
									MeetingZip = @zipcode,
									Address = @address,
									EditTime= @editTime
									where Post.Id=@id";
					DbUtils.AddParameter(cmd, "@id", post.Id);
					DbUtils.AddParameter(cmd, "@authorId", post.Author.Id);
					DbUtils.AddParameter(cmd, "@groupId", post.Group.Id);
					DbUtils.AddParameter(cmd, "@title", post.Title);
					DbUtils.AddParameter(cmd, "@content", post.Content);
					DbUtils.AddParameter(cmd, "@zipcode", post.Zipcode);
					DbUtils.AddParameter(cmd, "@address", post.Address);
					DbUtils.AddParameter(cmd, "@editTime", DateTime.Now);

					cmd.ExecuteNonQuery ();
				}
			}
		}



	}
}
