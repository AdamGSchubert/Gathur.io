using System;

namespace Gathur.Models
{
	public class Comment
	{

		public int Id { get; set; }

		public int PostId { get; set; }

		public int AuthorId { get; set; }
		public User Author { get; set; }
		public string Content { get; set; }
		public DateTime SubmitTime { get; set; }
		public DateTime? EditTime { get; set; }

	}
}
