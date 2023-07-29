namespace Gathur.Models
{
	public class ZipCodeQuery//model for the zipcode query json object
	{
		public string code { get; set; }

		public string unit { get; set; }

		public string radius{ get; set; }

		public string country { get; set; }
	}
}
