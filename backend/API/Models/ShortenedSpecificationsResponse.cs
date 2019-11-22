using System.Collections.Generic;

namespace API.Models
{
    public class ShortenedSpecificationsResponse
    {
        public IEnumerable<ShortSpecificationResponse> Specifications { get; set; }
    }
}