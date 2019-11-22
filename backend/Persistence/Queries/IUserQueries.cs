using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Queries
{
    public interface IUserQueries
    {
        Task<bool> UserExists(string email);
        Task<User> FindUser(string email);
        Task<bool> SpecificationBelongsToUser(int userId, int specificationId);
    }
}