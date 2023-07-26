using Gathur.Models;
using System.Collections.Generic;

namespace Gathur.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetAllPostsByGroupId(int groupId);

        List<Post> GetRandomPosts();

        Post GetPostById(int id);

        void NewPost(Post post);

        void DeletePost(int id);

        void UpdatePost(int id, Post post);

	}
}