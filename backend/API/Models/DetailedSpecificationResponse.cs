using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence.Models;

namespace API.Models
{
    public class DetailedSpecificationResponse
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string IntendedUse { get; set; }

        public IEnumerable<string> FunctionalRequirements { get; set; }
        public IEnumerable<string> NonFunctionalRequirements { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }

        public UserDetails UserDetails { get; set; }
    }

    public class UserDetails
    {
        public string Username { get; set; }
        public string PictureUrl { get; set; }
    }
}
