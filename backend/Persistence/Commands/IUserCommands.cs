using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Commands
{
    public interface IUserCommands
    {
        Task<User> InsertUser(string auth0Id, string email, string pictureUrl, string username);
    }
}