using Microsoft.EntityFrameworkCore;
using Persistence.Models;
using System.Threading.Tasks;

namespace Persistence.Queries
{
    public class BlogQueries : IBlogQueries
    {
        private readonly SpecificationContext _context;

        public BlogQueries(SpecificationContext context)
        {
            _context = context;
        }

        public Task<Blog> GetBlog(int id)
        {
            return _context.Blogs.FirstOrDefaultAsync(b => b.BlogId == id);
        }
    }
}
