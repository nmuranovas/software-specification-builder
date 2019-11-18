using System.Collections.Generic;
using Persistence.Models;

namespace API.Models
{
    public class PaginatedSpecifications
    {
        public IEnumerable<ShortenedSpecification> ShortenedSpecifications { get; set; }
        public int TotalPageCount { get; set; }
    }
}