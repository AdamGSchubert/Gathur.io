using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Gathur.Models
{
	[Serializable]//if you want to pass the data back as a json serializable data
	public class ZipCodeQueryResult
	{
		//specify the two json objs properties that the api returns
		//states that they are both json poperties with name specific
		[JsonProperty("query")]
		public ZipCodeQuery query { get; set; } // specify the type to zipcodequery


		[JsonProperty("results")]
		public List<ZipcodeCheck> results { get; set; }
	}

	
}
