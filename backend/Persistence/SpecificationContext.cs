using Microsoft.EntityFrameworkCore;
using Persistence.Models;

namespace Persistence
{
    public class SpecificationContext : DbContext
    {
        public SpecificationContext(DbContextOptions options) : base(options) { }
        public DbSet<Blog> Blogs { get; set; }
    }
}
