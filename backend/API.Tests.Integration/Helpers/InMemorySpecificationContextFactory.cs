using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Tests.Integration.Helpers
{
    public static class InMemorySpecificationContextFactory
    {
        public static SpecificationContext CreateInMemorySpecificationContext()
        {
            var options = new DbContextOptionsBuilder<SpecificationContext>()
                .UseInMemoryDatabase(databaseName: "test-database")
                .Options;

            return new SpecificationContext(options);
        }
    }
}