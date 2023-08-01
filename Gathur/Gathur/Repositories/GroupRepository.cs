using Gathur.Interfaces;
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
					cmd.CommandText = @"select Id, [Name], Description 
										FROM [Group]
										where [Name] like @search";

					DbUtils.AddParameter(cmd, "@search", $"%{searchTerm}%");
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


		public List<Group> AllGroups()
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, [name], Description 
										FROM [Gathur].[dbo].[Group]";

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
					cmd.CommandText = @"select [Group].Id as GroupId,[Name] as GroupName from [Group]
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
							Name = DbUtils.GetString(reader, "GroupName"),
						});
					}
					reader.Close();
					return myGroups;
				}
			}
		}
		//create
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

					group.Id = (int)cmd.ExecuteScalar();
				}
			}
		}
		//update
		public void UpdateGroup(Group Group)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"Update [Group]
										set [Name] = @name,
										Description = @desc
										where Id = @id";
					DbUtils.AddParameter(cmd, "@id", Group.Id);
					DbUtils.AddParameter(cmd, "@name", Group.Name);
					DbUtils.AddParameter(cmd, "@desc", Group.Description);

					cmd.ExecuteNonQuery();
				}
			}
		}

		//create Group Admin.
		public void AddUserToGroupAdmin(int groupId,int userId )
		{
			using (var conn = Connection) 
			{
			conn.Open();
			using (var cmd =conn.CreateCommand())
				{
					cmd.CommandText = @" insert into GroupAdmin
										( GroupId, UserId)
										output Inserted.Id
										Values (@groupId, @userId)";

					DbUtils.AddParameter(cmd, "@groupId", groupId);
					DbUtils.AddParameter(cmd, "@userId", userId);

					cmd.ExecuteNonQuery();
				}
			}
		}

		public List<GroupAdmin> GetGroupAdmins(int groupId)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd=conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, GroupId, UserId
										from GroupAdmin
										where GroupId = @groupId";

					DbUtils.AddParameter(cmd, "@groupId", groupId);

					var reader = cmd.ExecuteReader();
					var GroupAdmins = new List<GroupAdmin>();
					while(reader.Read())
					{
						GroupAdmins.Add(new GroupAdmin()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							GroupId = DbUtils.GetInt(reader,"GroupId"),
							UserId=DbUtils.GetInt(reader, "UserId")

						});
					}
					return GroupAdmins;
				}
			}
		}


		public List<JoinedGroup> GetJoinedGroups(int userId) 
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"select Id, UserId, GroupId
										from JoinedGroup
										where UserId = @userid";
					DbUtils.AddParameter(cmd, "@userid", userId);

					List<JoinedGroup> wholeList = new List<JoinedGroup>();
					var reader = cmd.ExecuteReader();
					while (reader.Read())
					{
						wholeList.Add(new JoinedGroup()
						{
							Id = DbUtils.GetInt(reader, "Id"),
							UserId = DbUtils.GetInt(reader, "UserId"),
							GroupId = DbUtils.GetInt(reader, "GroupId")
						});
					}
					return wholeList;
				}
			}
		}
		public void AddUserToGroup(JoinedGroup groupJoin)
		{
			using (var conn = Connection)
			{
				conn.Open();
				using (var cmd = conn.CreateCommand())
				{
					cmd.CommandText = @"insert into JoinedGroup
										(UserId, GroupId)
										output Inserted.Id
										Values (@userid, @groupid)";
					DbUtils.AddParameter(cmd, "@userid", groupJoin.UserId);
					DbUtils.AddParameter(cmd, "@groupid", groupJoin.GroupId);

					groupJoin.Id = (int)cmd.ExecuteScalar();
				}
			}
		}
	}

	


}
