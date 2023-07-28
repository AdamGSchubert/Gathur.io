using Newtonsoft.Json;
using System;

namespace Gathur.Models
{
	[Serializable]
	public class ZipcodeCheck
	{
		[JsonProperty("Code")]
		public int Code { get; set; }

		[JsonProperty("City")]
		public string City { get; set; }

		[JsonProperty("State")]
		public string State { get; set; }

		[JsonProperty("City_en")]
		public string City_en { get; set; }

		[JsonProperty("State_en")]
		public string State_en { get; set; }

		[JsonProperty("Distance")]
		public decimal Distance { get; set; }
	}
}
