using System;
using System.Collections.Generic;
using System.Linq;
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

        [Fact]
        public async Task GetShouldReturn3RdAnd4ThSpecificationsIfDatabaseHas5()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var dummySpecs = Enumerable.Range(0, 5).Select(num => new Specification { Title = num.ToString() }).ToList();
            context.Specifications.AddRange(dummySpecs);
            context.SaveChanges();

            var result = specificationController.Get(1, 2);
            var specifications = result.Value.Specifications.ToList();

            Assert.Equal(dummySpecs[2].Title, specifications[0].Title);
            Assert.Equal(dummySpecs[3].Title, specifications[1].Title);
        }

        [Fact]
        public async Task GetShouldReturn2SpecificationsOrderedByAscendingDate()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var dummySpecs = new List<Specification>
                {
                    new Specification {CreatedAt = DateTime.MinValue},
                    new Specification {CreatedAt = DateTime.MaxValue}

                };
            context.Specifications.AddRange(dummySpecs);
            context.SaveChanges();

            var result = specificationController.Get("createdAtAsc", 0, 2);
            var specifications = result.Value.Specifications.ToList();

            Assert.True(specifications.First().CreatedAt < specifications.Last().CreatedAt);
        }        
        
        [Fact]
        public async Task GetShouldReturn2SpecificationsOrderedByDescendingDate()
        {
            await using var context = InMemorySpecificationContextFactory.CreateInMemorySpecificationContext();
            var specificationQueries = new SpecificationQueries(context);
            var specificationController = new SpecificationController(null, specificationQueries);

            var dummySpecs = new List<Specification>
                {
                    new Specification {CreatedAt = DateTime.MinValue},
                    new Specification {CreatedAt = DateTime.MaxValue}

                };
            context.Specifications.AddRange(dummySpecs);
            context.SaveChanges();

            var result = specificationController.Get("createdAtDesc", 0, 2);
            var specifications = result.Value.Specifications.ToList();

            Assert.True(specifications.First().CreatedAt > specifications.Last().CreatedAt);
        }
    }
}