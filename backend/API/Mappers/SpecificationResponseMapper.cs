using System.Collections.Generic;
using System.Linq;
using API.Models;
using Persistence.Models;

namespace API.Mappers
{
    public class SpecificationResponseMapper : ISpecificationResponseMapper
    {
        public DetailedSpecificationResponse MapModelToDetailedResponse(Specification specification)
        {
            var response = new DetailedSpecificationResponse
            {
                Id = specification.Id,
                Audience = specification.Audience,
                CreatedAt = specification.CreatedAt,
                FunctionalRequirements = specification.FunctionalRequirements.Select(fr => fr.Description),
                NonFunctionalRequirements = specification.NonFunctionalRequirements.Select(nfr => nfr.Description),
                IntendedUse = specification.IntendedUse,
                LastModified = specification.LastModified,
                Slug = specification.Slug,
                Title = specification.Title,
                UserDetails = new UserDetails
                {
                    Username = specification.User.Username,
                    PictureUrl = specification.User.PictureUrl
                }
            };
            return response;
        }

        public IEnumerable<ShortSpecificationResponse> MapModelsToShortShortResponses(IEnumerable<Specification> specifications)
        {
            return specifications.Select(spec => new ShortSpecificationResponse
            {
                Id = spec.Id,
                CreatedAt = spec.CreatedAt,
                Slug = spec.Slug,
                Title = spec.Title,
                LastModified = spec.LastModified
            });
        }
    }
}