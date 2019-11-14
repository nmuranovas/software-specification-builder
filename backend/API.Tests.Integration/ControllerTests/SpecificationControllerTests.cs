using System.Threading.Tasks;
using API.Controllers;
using API.Tests.Integration.Helpers;
using Microsoft.AspNetCore.Mvc;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;
using Xunit;

namespace API.Tests.Integration.ControllerTests
{
    public class SpecificationControllerTests
    {
        [Fact]
        public async Task GetShouldReturnSpecificationModelIfItExistsAsync()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var dummy = new Specification();
            context.Add(dummy);
            context.SaveChanges();
            var result = await specificationController.Get(dummy.Id);

            Assert.NotNull(result.Value);
        }

        [Fact]
        public async Task GetShouldReturnNotFoundResultIfNoSpecificationsAreFound()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var result = await specificationController.Get(121212);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task DeleteShouldReturnDeletedEntityOnSuccessfulDelete()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
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
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationCommands = new SpecificationCommands(context);
            var specificationController = new SpecificationController(specificationCommands, null);

            var result = await specificationController.Delete(456789);

            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostShouldReturnGetActionOnSuccessfulInsert()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationCommands = new SpecificationCommands(context);
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(specificationCommands, specificationQueries);
            var specification = new Specification();

            var result = await specificationController.Post(specification);

            Assert.IsType<CreatedAtActionResult>(result.Result);
        }

        [Fact]
        public async Task PutShouldReturnBadRequestIfRouteIdAndModelIdDoNotMatch()
        {
            var specificationController = new SpecificationController(null, null);
            var specification = new Specification();

            var result = await specificationController.Put(10, specification);

            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task PutShouldReturnNoContentIfUpdateIsSuccessful()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationCommands = new SpecificationCommands(context);
            var specificationController = new SpecificationController(specificationCommands, null);

            var dummy = new Specification();
            context.Add(dummy);
            context.SaveChanges();

            var result = await specificationController.Put(dummy.Id, dummy);

            Assert.IsType<NoContentResult>(result);
        }
    }
}