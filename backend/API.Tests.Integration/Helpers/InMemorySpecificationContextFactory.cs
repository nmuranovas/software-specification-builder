using System;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Tests.Integration.Helpers
{
    public static class InMemorySpecificationContextFactory
    {
        public static SpecificationContext CreateInMemorySpecificationContext()
        {
            var options = new DbContextOptionsBuilder<SpecificationContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            return new SpecificationContext(options);
        }
    }
}