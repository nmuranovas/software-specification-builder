using System.Threading.Tasks;
using Persistence.Models;

namespace API.Services
{
    public interface IAuth0Service
    {
        Task<UserDetailsResponse> CreateUser(string token);
    }
}