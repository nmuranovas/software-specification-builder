using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System;
using System.Threading.Tasks;

namespace Persistence.Commands
{
    public class SpecificationCommands : ISpecificationCommands
    {
        private readonly SpecificationContext _context;

        public SpecificationCommands(SpecificationContext context)
        {
            _context = context;
        }

        public async Task<Specification> DeleteSpecification(int id)
        {
            var entity = await _context.Specifications.FirstOrDefaultAsync(s => s.Id == id);
            if (entity == null)
            {
                return null;
            }
            else
            {
                _context.Specifications.Remove(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
        }

        public async Task InsertSpecification(Specification specification)
        {
            var currentDate = DateTime.UtcNow;
            specification.CreatedAt = currentDate;
            specification.LastModified = currentDate;

            await _context.Specifications.AddAsync(specification);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecification(Specification specification)
        {
            _context.Entry(specification).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
