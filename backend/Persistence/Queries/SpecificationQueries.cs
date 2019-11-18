using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Queries
{
    public class SpecificationQueries : ISpecificationQueries
    {
        private readonly SpecificationContext _context;

        public SpecificationQueries(SpecificationContext context)
        {
            _context = context;
        }

        public IEnumerable<Specification> FindAllByPageNumberAndSize(int pageNumber, int pageSize)
        {
            return _context.Specifications
                .Include(spec => spec.FunctionalRequirements)
                .Include(spec => spec.NonFunctionalRequirements)
                .Skip(pageNumber * pageSize).Take(pageSize);
        }

        public int GetTotalSpecificationCount()
        {
            return _context.Specifications.Count();
        }

        public Task<Specification> FetchByIdAsync(int id)
        {
            return _context.Specifications.FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<bool> Exists(int id)
        {
            return _context.Specifications.AnyAsync(s => s.Id == id);
        }
    }
}
