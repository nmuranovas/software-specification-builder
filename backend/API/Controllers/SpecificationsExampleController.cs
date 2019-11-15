using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecificationsExampleController : ControllerBase
    {
        private readonly SpecificationContext _context;

        public SpecificationsExampleController(SpecificationContext context)
        {
            _context = context;
        }

        // GET: api/SpecificationsExample
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specification>>> GetSpecifications()
        {
            return await _context.Specifications.ToListAsync();
        }

        // GET: api/SpecificationsExample/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specification>> GetSpecification(int id)
        {
            var specification = await _context.Specifications.FindAsync(id);

            if (specification == null)
            {
                return NotFound();
            }

            return specification;
        }

        // PUT: api/SpecificationsExample/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecification(int id, Specification specification)
        {
            if (id != specification.Id)
            {
                return BadRequest();
            }

            _context.Entry(specification).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpecificationExists(id))
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

        // POST: api/SpecificationsExample
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Specification>> PostSpecification(Specification specification)
        {
            _context.Specifications.Add(specification);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSpecification", new { id = specification.Id }, specification);
        }

        // DELETE: api/SpecificationsExample/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Specification>> DeleteSpecification(int id)
        {
            var specification = await _context.Specifications.FindAsync(id);
            if (specification == null)
            {
                return NotFound();
            }

            _context.Specifications.Remove(specification);
            await _context.SaveChangesAsync();

            return specification;
        }

        private bool SpecificationExists(int id)
        {
            return _context.Specifications.Any(e => e.Id == id);
        }
    }
}
