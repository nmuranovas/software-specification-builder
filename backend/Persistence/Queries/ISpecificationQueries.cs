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
        IEnumerable<Specification> FindAllByPageNumberAndSizeOrderedBy(int pageNumber, int pageSize, SpecificationOrderOptions orderOptions);
        Task<IEnumerable<Specification>> SearchByTextAsync(string searchText, int pageNumber, int itemCount, SpecificationOrderOptions orderOption);
    }
}