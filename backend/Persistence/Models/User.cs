using System.Collections.Generic;

namespace Persistence.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string PictureUrl { get; set; }
        public string Auth0Id { get; set; }

        public List<Specification> Specifications { get; set; }
    }
}