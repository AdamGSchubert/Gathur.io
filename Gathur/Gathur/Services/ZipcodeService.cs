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
		private static HttpClient zipclient = new()
		{
			BaseAddress = new Uri("https://app.zipcodebase.com/api/{{version}}/radius?")
		};
		// public List<ZipcodeCheck> Checks()
		//{

		//}
		public List<ZipcodeCheck> GetZipsAsync(int zipcode, int radius)
		{
			List<ZipcodeCheck> zipList = new List<ZipcodeCheck>();

			ZipCodeQueryResult resultObj = GetZipsFromThirdParty(zipcode, radius).Result;

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
			{
				var response = client.GetAsync(url).Result;
				String result = await response.Content.ReadAsStringAsync();
				resultObj = JsonConvert.DeserializeObject<ZipCodeQueryResult>(result);
			}

			return resultObj;
		}
	}



}
	

