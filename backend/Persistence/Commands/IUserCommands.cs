using System.Threading.Tasks;

namespace Persistence.Commands
{
    public interface IUserCommands
    {
        Task InsertUser(string email, string pictureUrl, string nickname);
    }
}