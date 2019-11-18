using System;
using System.Collections.Generic;
using Persistence.Models;

namespace API.Models
{
    public class ShortenedSpecification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}