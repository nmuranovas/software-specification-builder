using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Queries
{
    public interface ISpecificationQueries
    {
        Task<bool> Exists(int id);
        Task<Specification> FetchByIdAsync(int id);
    }
}