using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Persistence.Commands
{
    public class BlogCommands : IBlogCommands
    {
        private readonly SpecificationContext _specificationContext;

        public BlogCommands(SpecificationContext specificationContext)
        {
            _specificationContext = specificationContext;
        }

        public Task InsertBlog(string blogUrl)
        {
            _specificationContext.Blogs.Add(new Blog { Url = blogUrl });
            return _specificationContext.SaveChangesAsync();
        }
    }
}
