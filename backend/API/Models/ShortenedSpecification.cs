using System;
using System.Collections.Generic;
using Persistence.Models;

namespace API.Models
{
    public class ShortSpecificationResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastModified { get; set; }
    }
}