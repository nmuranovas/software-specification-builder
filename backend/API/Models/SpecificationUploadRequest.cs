using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace API.Models
{
    public class SpecificationUploadRequest : IValidatableObject
    {
        [Required, MaxLength(100)]
        public string Title { get; set; }

        [Required, MaxLength(100)]
        public string Audience { get; set; }
        
        [Required, MaxLength(360)]
        public string IntendedUse { get; set; }

        [Required]
        public IEnumerable<string> FunctionalRequirements { get; set; }
        [Required]
        public IEnumerable<string> NonFunctionalRequirements { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var results = new List<ValidationResult>();
            if (!FunctionalRequirements.Any() || FunctionalRequirements.Any(string.IsNullOrEmpty))
                results.Add(new ValidationResult("Functional requirements cannot be empty or contain or empty items.", new[] { "FunctionalRequirements" }));
            if (!NonFunctionalRequirements.Any() || NonFunctionalRequirements.Any(string.IsNullOrEmpty))
                results.Add(new ValidationResult("Non-Functional requirements cannot be empty or contain or empty items.", new[] { "NonFunctionalRequirements" }));
            return results;
        }
    }
}