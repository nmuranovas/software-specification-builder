using System.Threading.Tasks;

namespace API.Services
{
    public interface ISlugService
    {
        Task<string> GenerateUniqueSlug(string input);
    }
}