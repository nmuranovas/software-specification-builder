using System.Threading.Tasks;

namespace Persistence.Commands
{
    public interface IBlogCommands
    {
        Task InsertBlog(string blogUrl);
    }
}