using Gathur.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gathur.Models;

namespace Gathur.Services
{
	public interface IZipcodeService
	{

		List<ZipcodeCheck> GetZipsAsync(int zipcode, int radius);
	}
}
