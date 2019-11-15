using System.Collections.Generic;
using Persistence.Models;

namespace API.Models
{
    public class PaginatedSpecifications
    {
        public IEnumerable<Specification> Specifications { get; set; }
        public int TotalPageCount { get; set; }
    }
}