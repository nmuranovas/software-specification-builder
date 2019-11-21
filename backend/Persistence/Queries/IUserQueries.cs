using System.Threading.Tasks;

namespace Persistence.Queries
{
    public interface IUserQueries
    {
        Task<bool> UserExists(string email);
    }
}