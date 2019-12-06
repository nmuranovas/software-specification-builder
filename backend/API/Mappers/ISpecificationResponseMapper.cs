using System.Collections.Generic;
using API.Models;
using Persistence.Models;

namespace API.Mappers
{
    public interface ISpecificationResponseMapper
    {
        DetailedSpecificationResponse MapModelToDetailedResponse(Specification specification);
        IEnumerable<ShortSpecificationResponse> MapModelsToShortShortResponses(IEnumerable<Specification> specifications);
    }
}