﻿using Gathur.Interfaces;
using Gathur.Models;
using Gathur.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace Gathur.Repositories
{
    public class GroupRepository : BaseRepository, IGroupRepository
	{
		public GroupRepository(IConfiguration configuration) : base(configuration)
		{
		}

		public List<Group> SearchGroups(string searchTerm)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, [name], Description 
										FROM [Gathur].[dbo].[Group]
										where [Name] like '%@search%'";

					DbUtils.AddParameter(cmd, "@search", searchTerm);
					var reader = cmd.ExecuteReader();

					var groups = new List<Group>();
					while (reader.Read())
					{
						groups.Add(new Group()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							Name = DbUtils.GetString(reader, "Name"),
							Description = DbUtils.GetString(reader, "Description")

						});
					}
					reader.Close();
					return groups;
				}
			}
		}


		public Group GroupById(int id)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, [name], Description 
										FROM [Gathur].[dbo].[Group]
										where id = @id";

					DbUtils.AddParameter(cmd, "@id", id);
					var reader = cmd.ExecuteReader();

					Group group = null;
					if (reader.Read())
					{
						group = new Group()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							Name = DbUtils.GetString(reader, "Name"),
							Description = DbUtils.GetString(reader, "Description")

						};

					}
					reader.Close();
					return group;
				}
			}
		}

		public List<Group> UserGroups(int userId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select [Group].Id as GroupId, [Group].[Name] as GroupName from [Group]
										join JoinedGroup on [Group].Id = JoinedGroup.GroupId
										where JoinedGroup.UserId = @id";

					DbUtils.AddParameter(cmd, "@id", userId);
					var reader = cmd.ExecuteReader();

					var myGroups = new List<Group>();
					while (reader.Read()) 
					{
						myGroups.Add(new Group()
						{
							Id = DbUtils.GetInt(reader, "GroupId"),
							Name = DbUtils.GetString(reader, "Name"),
						});
					}
					reader.Close();
					return myGroups;
				}	
			}
		}

		public void MakeAGroup(Group group)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"insert into [Group]
								([Name], Description)
								output Inserted.Id
								Values (@name, @desc)";

					DbUtils.AddParameter(cmd, "@name", group.Name);
					DbUtils.AddParameter(cmd, "@desc", group.Description);


				}
			}
		}

		public void UpdateGroup(int id)
		{
			throw new System.NotImplementedException();
		}
	}


}
