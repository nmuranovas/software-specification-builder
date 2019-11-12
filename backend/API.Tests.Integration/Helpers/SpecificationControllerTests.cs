using API.Controllers;
using API.Tests.Integration.Helpers;
using Microsoft.AspNetCore.Mvc;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;
using System.Threading.Tasks;
using Xunit;

namespace API.Tests.Integration
{
    public class SpecificationControllerTests
    {
        [Fact]
        public async Task GetShouldReturnSpecificationModelIfItExistsAsync()
        {
            using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var dummy = new Specification();
            context.Add(dummy);
            context.SaveChanges();
            var result = await specificationController.Get(1);

            Assert.NotNull(result.Value);
        }

        [Fact]
        public async Task GetShouldReturnNotFoundResultIfNoSpecificationsAreFound()
        {
            using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var result = await specificationController.Get(1);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task DeleteShouldReturnDeletedEntityOnSuccessfulDelete()
        {
            using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationCommands = new SpecificationCommands(context);
            var specificationController = new SpecificationController(specificationCommands, null);

            var dummy = new Specification();
            context.Add(dummy);
            context.SaveChanges();
            var result = await specificationController.Delete(dummy.Id);

            Assert.NotNull(result.Value);
        }

        [Fact]
        public async Task DeleteShouldReturnNotFoundIfEntityWithSpecifiedIdIsNotFound()
        {
            using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationCommands = new SpecificationCommands(context);
            var specificationController = new SpecificationController(specificationCommands, null);

            var result = await specificationController.Delete(456789);

            Assert.IsType<NotFoundResult>(result.Result);
        }
    }
}