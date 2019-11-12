using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
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
