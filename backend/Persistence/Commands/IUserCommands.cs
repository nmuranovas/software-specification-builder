using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Commands
{
    public interface IUserCommands
    {
        Task<User> InsertUser(string email, string pictureUrl, string nickname);
    }
}