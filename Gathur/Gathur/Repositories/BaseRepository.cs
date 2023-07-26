using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Gathur.Repositories
{
	public class BaseRepository
	{
		private readonly string _connectionString;
		//create a private string to hold the connection 

		public BaseRepository(IConfiguration configuration)
		{
			_connectionString = configuration.GetConnectionString("DefaultConnection");
			//get the connection string saved in the appsettings.json by the name "defaultConnection"
		}

		protected SqlConnection Connection
		{
			get
			{
				return new SqlConnection(_connectionString);
			}
		}
	}
}
