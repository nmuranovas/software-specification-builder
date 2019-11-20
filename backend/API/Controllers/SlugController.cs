using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence.Queries;
using Slugify;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlugController : ControllerBase
    {
        private readonly ISpecificationQueries _specificationQueries;
        private readonly ISlugValidator _slugValidator;
        private static readonly SlugHelper Slugifier = new SlugHelper();

        public SlugController(ISpecificationQueries specificationQueries, ISlugValidator slugValidator)
        {
            _specificationQueries = specificationQueries;
            _slugValidator = slugValidator;
        }

        [Authorize]
        [HttpGet("exists/{slug}")]
        public async Task<ActionResult<bool>> SlugIsTaken(string slug)
        {
            if (_slugValidator.IsValid(slug))
            {
                return BadRequest("Slug is not valid");
            }

            return await _specificationQueries.SlugIsTaken(slug);
        }

        [Authorize]
        [HttpGet("generate/{keyword}")]
        public async Task<ActionResult<string>> GenerateSlug(string keyword)
        {
            if (string.IsNullOrEmpty(keyword))
            {
                return BadRequest("Keyword must be specified");
            }

            var slug = Slugifier.GenerateSlug(keyword);
            var newSlug = slug;
            for (var i = 1; i < int.MaxValue; i++)
            {
                if (!(await _specificationQueries.SlugIsTaken(newSlug)))
                {
                    return newSlug;
                }
                else
                {
                    newSlug = $"{slug}-{i}";
                }
            }

            throw new Exception("Slug could not be generated");
        }
    }
}