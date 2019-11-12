using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Commands
{
    public interface ISpecificationCommands
    {
        Task<Specification> DeleteSpecification(int id);
        Task InsertSpecification(Specification specification);
        Task UpdateSpecification(Specification specification);
    }
}