using System;

namespace Gathur.Models
{
	public class Post
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public int AuthorId { get; set; }
		public User Author { get; set; }

		public int PostTypeId { get; set; }
		public PostType PostType { get; set; }

		public int TagId { get; set; }
		
		public DateTime SubmitTime { get; set; }
		public string Address { get; set; }
		public int? Zipcode { get; set; }

		public int GroupId { get; set; }
		public Group Group { get; set; }

	}
}
