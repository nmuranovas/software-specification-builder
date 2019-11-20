using System.Text.RegularExpressions;

namespace API.Validators
{
    public class SlugValidator : ISlugValidator
    {
        private static readonly Regex SlugValidationRegex = new Regex("^([a-zA-Z0-9-])+$", RegexOptions.Compiled);

        public bool IsValid(string slug)
        {
            return !string.IsNullOrEmpty(slug) 
                   && SlugValidationRegex.IsMatch(slug);
        }
    }
}