using System.Collections.Generic;
using Persistence.Models;

namespace API.Models
{
    public class PaginatedSpecificationsResponse
    {
        public IEnumerable<ShortSpecificationResponse> ShortenedSpecifications { get; set; }
        public int TotalPageCount { get; set; }
    }
}