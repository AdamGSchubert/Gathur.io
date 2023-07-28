using Gathur.Models;
using System.Collections.Generic;

namespace Gathur.Interfaces
{
    public interface IGroupRepository
    {
        Group GroupById(int id);
        List<Group> SearchGroups(string searchTerm);

        List<Group> UserGroups(int userId);

        void MakeAGroup(Group group);

        void UpdateGroup(Group group);

        void AddUserToGroupAdmin(int userId, int groupId);

        List<GroupAdmin> GetGroupAdmins(int groupId);


	}
}