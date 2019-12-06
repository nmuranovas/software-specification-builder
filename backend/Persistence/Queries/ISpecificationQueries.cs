using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Queries
{
    public interface ISpecificationQueries
    {
        Task<bool> Exists(int id);
        Task<Specification> FetchByIdAsync(int id);
        IEnumerable<Specification> FindAllByPageNumberAndSize(int pageNumber, int pageSize);
        int GetTotalSpecificationCount();
        IEnumerable<Specification> FindAllByPageNumberAndSizeOrderedBy(int pageNumber, int pageSize, OrderingOptions orderOptions);
        Task<IReadOnlyCollection<Specification>> SearchByTextAsync(string searchText, int pageNumber, int itemCount,
            OrderingOptions orderOption);

        Task<int> CountSpecificationsThatMatchText(string searchText);
        Task<bool> SlugIsTaken(string slug);
        Task<Specification> FetchBySlugAsync(string slug);
        Task<IEnumerable<Specification>> FetchUserSpecifications(string auth0Id);
        Task<IEnumerable<Specification>> FetchUserSpecifications(string auth0Id, int page, int itemCount);
        Task<int> CountTotalUserSpecifications(string auth0Id);
    }
}