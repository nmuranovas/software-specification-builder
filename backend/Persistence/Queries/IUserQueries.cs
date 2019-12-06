using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Queries
{
    public interface IUserQueries
    {
        Task<bool> UserExists(string auth0Id);
        Task<User> FindUser(string auth0Id);
        Task<bool> SpecificationBelongsToUser(int userId, int specificationId);
        Task<bool> SpecificationBelongsToUser(string userAuth0Id, int specificationId);
    }
}