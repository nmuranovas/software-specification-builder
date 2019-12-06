using System.Threading.Tasks;
using Persistence.Queries;
using Slugify;

namespace API.Services
{
    public class SlugService : ISlugService
    {
        private static readonly SlugHelper Slugifier = new SlugHelper();


        private readonly ISpecificationQueries _specificationQueries;

        public SlugService(ISpecificationQueries specificationQueries)
        {
            _specificationQueries = specificationQueries;
        }

        public async Task<string> GenerateUniqueSlug(string input)
        {
            var slug = Slugifier.GenerateSlug(input);
            var newSlug = slug;
            for (var i = 1; i < int.MaxValue; i++)
            {
                if (!(await _specificationQueries.SlugIsTaken(newSlug)))
                {
                    return newSlug;
                }
                else
                {
                    newSlug = $"{slug}-{i}";
                }
            }

            return newSlug;
        }
    }
}