using System.Threading.Tasks;
using Persistence.Models;

namespace Persistence.Queries
{
    public interface IBlogQueries
    {
        Task<Blog> GetBlog(int id);
    }
}