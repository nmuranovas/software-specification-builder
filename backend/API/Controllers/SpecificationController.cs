using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
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