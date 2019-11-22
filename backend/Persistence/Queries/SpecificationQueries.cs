using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Queries
{
    public enum SpecificationOrderOptions
    {
        CreatedAtAsc,
        CreatedAtDesc
    }

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

        public IEnumerable<Specification> FindAllByPageNumberAndSizeOrderedBy(int pageNumber, int pageSize, SpecificationOrderOptions orderOptions)
        {
            return orderOptions switch
            {
                SpecificationOrderOptions.CreatedAtAsc => _context.Specifications
                    .OrderBy(spec => spec.CreatedAt)
                    .Skip(pageNumber * pageSize)
                    .Take(pageSize),
                SpecificationOrderOptions.CreatedAtDesc => _context.Specifications
                    .OrderByDescending(spec => spec.CreatedAt)
                    .Skip(pageNumber * pageSize)
                    .Take(pageSize),
                _ => throw new ArgumentOutOfRangeException(nameof(orderOptions), orderOptions, null)
            };
        }

        public async Task<IReadOnlyCollection<Specification>> SearchByTextAsync(string searchText, int pageNumber, int itemCount, SpecificationOrderOptions orderOption)
        {
            var query = _context.Specifications.Where(spec =>
                spec.Title.ToLower().Contains(searchText.ToLower()));
            switch (orderOption)
            {
                case SpecificationOrderOptions.CreatedAtAsc:
                    query = query.OrderBy(spec => spec.CreatedAt);
                    break;
                case SpecificationOrderOptions.CreatedAtDesc:
                    query = query.OrderByDescending(spec => spec.CreatedAt);
                    break;
                default:
                    throw new ArgumentOutOfRangeException(nameof(orderOption), orderOption, null);
            }

            return await query.Skip(pageNumber * itemCount)
                .Take(itemCount).ToListAsync();
        }

        public Task<int> CountSpecificationsThatMatchText(string searchText)
        {
            var query = _context.Specifications.Where(spec =>
                spec.Title.ToLower().Contains(searchText.ToLower()));

            return query.CountAsync();
        }

        public int GetTotalSpecificationCount()
        {
            return _context.Specifications.Count();
        }

        public Task<Specification> FetchByIdAsync(int id)
        {
            return _context.Specifications
                .Include(spec => spec.FunctionalRequirements)
                .Include(spec => spec.NonFunctionalRequirements)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public Task<bool> Exists(int id)
        {
            return _context.Specifications.AnyAsync(s => s.Id == id);
        }

        public Task<bool> SlugIsTaken(string slug)
        {
            return _context.Specifications.AnyAsync(spec => string.Equals(spec.Slug.ToLower(), slug.ToLower()));
        }

        public Task<Specification> FetchBySlugAsync(string slug)
        {
            return _context.Specifications
                .Include(spec => spec.FunctionalRequirements)
                .Include(spec => spec.NonFunctionalRequirements)
                .Include(spec => spec.User)
                .FirstOrDefaultAsync(spec => string.Equals(slug.ToLower(), spec.Slug));
        }

        public async Task<IEnumerable<Specification>> FetchUserSpecifications(string email)
        {
            return await _context.Specifications
                .Include(spec => spec.User)
                .Where(spec => spec.User.Email == email).ToListAsync();
        }
    }
}
