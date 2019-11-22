using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using API.Mappers;
using API.Models;
using API.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence.Commands;
using Persistence.Models;
using Persistence.Queries;
using Slugify;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecificationController : ControllerBase
    {
        private readonly ISpecificationCommands _specificationCommands;
        private readonly ISpecificationQueries _specificationQueries;
        private readonly ISlugValidator _slugValidator;
        private readonly ISpecificationResponseMapper _specificationResponseMapper;
        private readonly IUserQueries _userQueries;

        public SpecificationController(ISpecificationCommands specificationCommands, ISpecificationQueries specificationQueries, ISlugValidator slugValidator, ISpecificationResponseMapper specificationResponseMapper, IUserQueries userQueries)
        {
            _specificationCommands = specificationCommands;
            _specificationQueries = specificationQueries;
            _slugValidator = slugValidator;
            _specificationResponseMapper = specificationResponseMapper;
            _userQueries = userQueries;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Specification>> Delete(int id)
        {
            var userId = ((User)HttpContext.Items["User"]).Id;
            var specificationBelongsToUser = await _userQueries.SpecificationBelongsToUser(userId, id);
            if (!specificationBelongsToUser)
            {
                return Unauthorized();
            }

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

        [HttpGet, Route("/api/[controller]/search")]
        public async Task<ActionResult<PaginatedResponse<IEnumerable<ShortSpecificationResponse>>>> Search([FromQuery] string searchText, [FromQuery]int pageNumber, [FromQuery]int itemCount, [FromQuery]string sortByTerm)
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

            var specifications = await _specificationQueries.SearchByTextAsync(searchText, pageNumber, itemCount, orderOption);
            var shortenedSpecifications = _specificationResponseMapper.MapModelsToShortShortResponses(specifications);

            var totalSpecifications = await _specificationQueries.CountSpecificationsThatMatchText(searchText);

            return PaginatedResponseFactory.Create(shortenedSpecifications, pageNumber, itemCount, totalSpecifications);
        }


        [HttpGet("{slug}")]
        public async Task<ActionResult<DetailedSpecificationResponse>> GetBySlug(string slug)
        {
            var specification = await _specificationQueries.FetchBySlugAsync(slug);
            if (specification == null)
            {
                return NotFound();
            }
            else
            {
                var response = _specificationResponseMapper.MapModelToDetailedResponse(specification);
                return response;
            }
        }

        [HttpGet]
        public ActionResult<PaginatedResponse<IEnumerable<ShortSpecificationResponse>>> Get([FromQuery]int pageNumber = 0, [FromQuery]int itemCount = 10, [FromQuery]string sortByTerm = null)
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
            var shortenedSpecifications = _specificationResponseMapper.MapModelsToShortShortResponses(specifications);

            var totalSpecificationCount = _specificationQueries.GetTotalSpecificationCount();

            return PaginatedResponseFactory.Create(shortenedSpecifications, pageNumber, itemCount, totalSpecificationCount);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Specification>> Post(Specification specification)
        {
            if (!_slugValidator.IsValid(specification.Slug))
            {
                return BadRequest("Slug is not valid");
            }
            else if (await _specificationQueries.SlugIsTaken(specification.Slug))
            {
                return BadRequest("Slug is taken");
            }

            specification.UserId = ((User)HttpContext.Items["User"]).Id;

            await _specificationCommands.InsertSpecification(specification);
            return CreatedAtAction(nameof(Get), new { id = specification.Id }, specification);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, SpecificationUpdateModel specificationUpdateModel)
        {
            var specification = await _specificationQueries.FetchByIdAsync(id);
            if (id != specification.Id)
            {
                return BadRequest();
            }

            specification.Audience = specificationUpdateModel.Audience;
            specification.IntendedUse = specificationUpdateModel.IntendedUse;
            specification.FunctionalRequirements = specificationUpdateModel
                .FunctionalRequirements.Select((fr, index) => new FunctionalRequirement
                { Description = fr, OrderNumber = (uint)index }).ToList();
            specification.NonFunctionalRequirements = specificationUpdateModel
                .NonFunctionalRequirements.Select((fr, index) => new NonFunctionalRequirement
                { Description = fr, OrderNumber = (uint)index }).ToList();

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

        [HttpGet("my-specifications")]
        [Authorize]
        public async Task<ActionResult<ShortenedSpecificationsResponse>> GetUserSpecifications()
        {
            var userEmail = ((User)HttpContext.Items["User"]).Email;
            var specifications = await _specificationQueries.FetchUserSpecifications(userEmail);
            var shortenedSpecifications = _specificationResponseMapper.MapModelsToShortShortResponses(specifications);

            return Ok(new ShortenedSpecificationsResponse { Specifications = shortenedSpecifications });
        }
    }
}