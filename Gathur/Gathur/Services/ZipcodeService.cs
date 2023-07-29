using Gathur.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Gathur.Services;
using Newtonsoft.Json;
using RestSharp;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Text.Json;
using RestSharp.Authenticators;
using System.Threading;
using Microsoft.VisualBasic;

namespace Gathur.Services
{
	public class ZipcodeService : IZipcodeService
	{
		//private static HttpClient zipclient = new()
		//{
		//	BaseAddress = new Uri("https://app.zipcodebase.com/api/{{version}}/radius?")
		//};
		// public List<ZipcodeCheck> Checks()
		//{

		//}
		public List<ZipcodeCheck> GetZipsAsync(int zipcode, int radius)
		{
			List<ZipcodeCheck> zipList = new List<ZipcodeCheck>();

			ZipCodeQueryResult resultObj = GetZipsFromThirdParty(zipcode, radius).Result;// separates the task from the controller to separate async logic out of the initial call.

			if (resultObj != null)
			{
				zipList = resultObj.results;
			}

			return zipList;

		}

		//private List<ZipcodeCheck> ParseApiData(String data)
		//{
		//	List<ZipcodeCheck> zipList = null;

		//	ZipCodeQueryResult resultObj = JsonConvert.DeserializeObject<ZipCodeQueryResult>(data);

		//	Console.WriteLine(resultObj);

		//	return zipList;
		//}

		private async Task<ZipCodeQueryResult> GetZipsFromThirdParty(int zipcode, int radius)
		{
			ZipCodeQueryResult resultObj = null;
			string url = $"https://app.zipcodebase.com/api/v1/radius?apikey={EnvironmentalVariables.apikey}&code={zipcode}&radius={radius}&country=US&unit=miles";
			using (HttpClient client = new HttpClient())
			{//consider httpclient the fetch api in javascript but in C#
				var response = client.GetAsync(url).Result; //running the get api call to the specified url, then awaits the result of the http message returned assigns to response
				String result = await response.Content.ReadAsStringAsync(); // takes that result and gets the content property then calls method to convert to data to string
				resultObj = JsonConvert.DeserializeObject<ZipCodeQueryResult>(result);//convert the json to the map class that was created in the zipcodeQueryResult
			}

			return resultObj;
		}
	}



}
	

