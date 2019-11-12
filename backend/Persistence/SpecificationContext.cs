using Microsoft.EntityFrameworkCore;
using Persistence.Models;

namespace Persistence
{
    public class SpecificationContext : DbContext
    {
        public SpecificationContext(DbContextOptions options) : base(options) { }
        
        public DbSet<Specification> Specifications { get; set; }
        public DbSet<FunctionalRequirement> FunctionalRequirements { get; set; }
        public DbSet<NonFunctionalRequirement> NonFunctionalRequirements { get; set; }
    }
}
