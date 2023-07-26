using Microsoft.Extensions.Configuration;
using Gathur.Models;
using Gathur.Interfaces;
using System.Text;
using System;
using System.Security.Cryptography;
using Gathur.Utils;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Microsoft.Data.SqlClient;

namespace Gathur.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
	{
		public UserRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public void CheckLoginUser(string username, string password)
		{
			throw new NotImplementedException();
		}
		
		public User GetByFirebaseUserId(string firebaseUserId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"
                        SELECT Id, Username, FirebaseUserId, FirstName, LastName,  
                               Email, CreateDateTime, AvatarImageUrl, Radius, Zipcode
                          FROM [User]
                         WHERE FirebaseUserId = @FirebaseuserId";

					DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

					User userProfile = null;

					var reader = cmd.ExecuteReader();
					if (reader.Read())
					{
						userProfile = new User()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							UserName = DbUtils.GetString(reader, "Username"),
							FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
							FirstName = DbUtils.GetString(reader, "FirstName"),
							LastName = DbUtils.GetString(reader, "LastName"),
							Email = DbUtils.GetString(reader, "Email"),
							CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
							AvatarImgUrl = DbUtils.GetString(reader, "AvatarImageUrl"),
							Radius = DbUtils.GetInt(reader, "Radius"),
							Zipcode = DbUtils.GetInt(reader, "Zipcode"),

					};
					}
					reader.Close();

					return userProfile;
				}
			}
		}
		
		public User GetUser(string username)
		{
			using (var conn = Connection)// use the connection defined in the base 
			{
				conn.Open(); //open the connection to the DB
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, UserName,FirebaseUserId, FirstName, LastName, 
										Email, CreateDateTime, AvatarImageUrl, Radius,Zipcode
										from [User]
										where UserName = @username";

					cmd.Parameters.AddWithValue("@username", username);

					var reader = cmd.ExecuteReader();
					var user = new User();

					while (reader.Read())
					{
						user.Id = DbUtils.GetInt(reader, "Id");
						user.UserName = DbUtils.GetString(reader, "UserName");
						user.FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId");
						user.FirstName = DbUtils.GetString(reader, "FirstName");
						user.LastName = DbUtils.GetString(reader, "LastName");
						user.Email = DbUtils.GetString(reader, "Email");
						user.CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime");
						user.AvatarImgUrl = DbUtils.GetString(reader, "AvatarImageUrl");
						user.Radius = DbUtils.GetInt(reader, "Radius");
						user.Zipcode = DbUtils.GetInt(reader, "Zipcode");
					}
					return user;
				}
			}
		}
		public void register(User newUser)
		{
			using (var conn = Connection)// use the connection defined in the base 
			{
				conn.Open(); //open the connection to the DB
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"insert into [User] ( UserName,[Password], FirstName, LastName, Email,CreateDateTime,  AvatarImageUrl, Radius,Zipcode ) 
							output Inserted.Id
							values (@username,
							 @password,
							@firstname,@lastname, 
							@email,
							@createdDate,
							@avatarImg, 
							@radius,
							@Zip
							)
							";
				
					DbUtils.AddParameter(cmd,"@username", newUser.UserName);
					//DbUtils.AddParameter(cmd, "@password", FirebaseUserId);
					DbUtils.AddParameter(cmd, "@firstname", newUser.FirstName);
					DbUtils.AddParameter(cmd, "@lastname", newUser.LastName);
					DbUtils.AddParameter(cmd, "@email", newUser.Email);
					DbUtils.AddParameter(cmd, "@createdDate", DateTime.Now);
					DbUtils.AddParameter(cmd, "@avatarImg", newUser.AvatarImgUrl);
					DbUtils.AddParameter(cmd, "@Zip", newUser.Zipcode);
					DbUtils.AddParameter(cmd, "@radius", newUser.Radius);

					newUser.Id = (int)cmd.ExecuteScalar();
				}
			}
		

		}
	}

	
}
