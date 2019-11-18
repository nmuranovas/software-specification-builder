using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecificationController : ControllerBase
    {
        private readonly ISpecificationCommands _specificationCommands;
        private readonly ISpecificationQueries _specificationQueries;

        public SpecificationController(ISpecificationCommands specificationCommands, ISpecificationQueries specificationQueries)
        {
            _specificationCommands = specificationCommands;
            _specificationQueries = specificationQueries;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Specification>> Delete(int id)
        {
            var deletedEntity = await _specificationCommands.DeleteSpecification(id);
            if (deletedEntity == null)
            {
                return NotFound();
            }
            else
            {
                return deletedEntity;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Specification>> Get(int id)
        {
            var specification = await _specificationQueries.FetchByIdAsync(id);
            if (specification == null)
            {
                return NotFound();
            }
            else
            {
                return specification;
            }
        }

        [HttpGet("{pageNumber}/{itemCount}")]
        public ActionResult<PaginatedSpecifications> Get(int pageNumber = 0, int itemCount = 10)
        {
            var specifications = _specificationQueries.FindAllByPageNumberAndSize(pageNumber, itemCount);
            var totalSpecificationCount = _specificationQueries.GetTotalSpecificationCount();

            var totalPageCount = totalSpecificationCount / itemCount;

            return new PaginatedSpecifications
            {
                Specifications = specifications,
                TotalPageCount = totalPageCount == 0 ? 1 : totalPageCount
            };
        }

        [HttpGet("{pageNumber}/{itemCount}/{sortByTerm}")]
        public ActionResult<PaginatedSpecifications> Get(int pageNumber = 0, int itemCount = 10, string sortByTerm = null)
        {
            SpecificationOrderOptions orderOption;
            switch (sortByTerm)
            {
                case null:
                case "createdAtDesc":
                    orderOption = SpecificationOrderOptions.CreatedAtDesc;
                    break;
                case "createdAtAsc":
                    orderOption = SpecificationOrderOptions.CreatedAtAsc;
                    break;
                default:
                    return BadRequest("Sorting term is not valid");
            }

            var specifications = _specificationQueries.FindAllByPageNumberAndSizeOrderedBy(pageNumber, itemCount, orderOption);
            var totalSpecificationCount = _specificationQueries.GetTotalSpecificationCount();

            var totalPageCount = totalSpecificationCount / itemCount;

            return new PaginatedSpecifications
            {
                Specifications = specifications,
                TotalPageCount = totalPageCount == 0 ? 1 : totalPageCount
            };
        }


        [HttpPost]
        public async Task<ActionResult<Specification>> Post(Specification specification)
        {
            await _specificationCommands.InsertSpecification(specification);
            return CreatedAtAction(nameof(Get), new { id = specification.Id }, specification);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Specification specification)
        {
            if (id != specification.Id)
            {
                return BadRequest();
            }

            try
            {
                await _specificationCommands.UpdateSpecification(specification);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await _specificationQueries.Exists(id)))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}