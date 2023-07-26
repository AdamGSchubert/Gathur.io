using System;
using System.Data.SqlTypes;

namespace Gathur.Models
{
	public class User
	{

		public int Id { get; set; }
		public string UserName { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public string Email { get; set; }
		public string FirebaseUserId { get; set; }

		public DateTime CreateDateTime { get; set; }

		public string AvatarImgUrl { get; set; }

		public int Radius { get; set; }
		public int Zipcode { get; set; }


	}
}
