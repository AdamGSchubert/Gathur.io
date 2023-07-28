using Gathur.Models;

namespace Gathur.Interfaces
{
    public interface IUserRepository
    {
        void CheckLoginUser(string username, string password);
        User GetUser(string username);
        void register(User newUser);
        User GetByFirebaseUserId(string firebaseUserId);



	}
}