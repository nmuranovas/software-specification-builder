using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class SpecificationUpdateModel
    {
        public string Audience { get; set; }
        public string IntendedUse { get; set; }

        public List<string> FunctionalRequirements { get; set; }
        public List<string> NonFunctionalRequirements { get; set; }
    }
}
