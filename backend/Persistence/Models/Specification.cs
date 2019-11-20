using System;
using System.Collections.Generic;

namespace Persistence.Models
{
    public class Specification
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Audience { get; set; }
        public string IntendedUse { get; set; }
     
        public List<FunctionalRequirement> FunctionalRequirements { get; set; }
        public List<NonFunctionalRequirement> NonFunctionalRequirements { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }
    }
}
