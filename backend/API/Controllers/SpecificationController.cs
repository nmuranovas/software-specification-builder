using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Mappers;
using API.Models;
using API.Services;
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
        private readonly IAuth0Service _auth0Service;
        private readonly IUserCommands _userCommands;
        private readonly ISlugService _slugService;

        public SpecificationController(ISpecificationCommands specificationCommands, ISpecificationQueries specificationQueries, ISlugValidator slugValidator, ISpecificationResponseMapper specificationResponseMapper, IUserQueries userQueries, IAuth0Service auth0Service, IUserCommands userCommands, ISlugService slugService)
        {
            _specificationCommands = specificationCommands;
            _specificationQueries = specificationQueries;
            _slugValidator = slugValidator;
            _specificationResponseMapper = specificationResponseMapper;
            _userQueries = userQueries;
            _auth0Service = auth0Service;
            _userCommands = userCommands;
            _slugService = slugService;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Specification>> Delete(int id)
        {
            var auth0Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var specificationBelongsToUser = await _userQueries.SpecificationBelongsToUser(auth0Id, id);
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
            OrderingOptions orderOption;
            switch (sortByTerm)
            {
                case null:
                case "createdAtDesc":
                    orderOption = OrderingOptions.CreatedAtDesc;
                    break;
                case "createdAtAsc":
                    orderOption = OrderingOptions.CreatedAtAsc;
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
            OrderingOptions orderOption;
            switch (sortByTerm)
            {
                case null:
                case "createdAtDesc":
                    orderOption = OrderingOptions.CreatedAtDesc;
                    break;
                case "createdAtAsc":
                    orderOption = OrderingOptions.CreatedAtAsc;
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
        public async Task<ActionResult<Specification>> Post(SpecificationUploadRequest requestModel)
        {
            var slug = await _slugService.GenerateUniqueSlug(requestModel.Title);

            var auth0Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userQueries.FindUser(auth0Id);
            if (user == null)
            {
                if (!HttpContext.Request.Headers.TryGetValue("Authorization", out var token))
                {
                    throw new InvalidOperationException("Failed to get authorization header info");
                }
                var userDetails = await _auth0Service.CreateUser(token);
                user = await _userCommands.InsertUser(auth0Id, userDetails.Email, userDetails.PictureUrl, userDetails.Nickname);
            }

            var specification = new Specification
            {
                Slug = slug,
                IntendedUse = requestModel.IntendedUse,
                Title = requestModel.Title,
                Audience = requestModel.Audience,
                UserId = user.Id,
                FunctionalRequirements = requestModel.FunctionalRequirements.Select((fr, idx) => new FunctionalRequirement{Description= fr, OrderNumber = (uint)idx}).ToList(),
                NonFunctionalRequirements = requestModel.NonFunctionalRequirements.Select((nfr, idx) => new NonFunctionalRequirement{Description=nfr, OrderNumber = (uint)idx}).ToList()
            };

            await _specificationCommands.InsertSpecification(specification);
            return CreatedAtAction(nameof(Get), new { id = specification.Id }, specification);
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, SpecificationUpdateModel specificationUpdateModel)
        {
            var auth0Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var specificationBelongsToUser = await _userQueries.SpecificationBelongsToUser(auth0Id, id);
            if (!specificationBelongsToUser)
            {
                return Unauthorized();
            }
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
        public async Task<ActionResult<PaginatedResponse<IEnumerable<ShortSpecificationResponse>>>> GetUserSpecifications([FromQuery]int page = 0, [FromQuery]int itemCount = 10, [FromQuery]string ordering = null)
        {
            OrderingOptions orderingOption;
            switch (ordering)
            {
                case null:
                case "createdAtDesc":
                    orderingOption = OrderingOptions.CreatedAtDesc;
                    break;
                case "createdAtAsc":
                    orderingOption = OrderingOptions.CreatedAtAsc;
                    break;
                default:
                    return BadRequest("Sorting term is not valid");
            }

            var auth0Id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userQueries.FindUser(auth0Id);
            if (user == null)
            {
                return PaginatedResponseFactory.CreateEmpty<IEnumerable<ShortSpecificationResponse>>();
            }
            var specifications = await _specificationQueries.FetchUserSpecifications(user.Auth0Id, page, itemCount);

            switch (orderingOption)
            {
                case OrderingOptions.CreatedAtAsc:
                    specifications = specifications.OrderBy(spec => spec.CreatedAt);
                    break;
                case OrderingOptions.CreatedAtDesc:
                default:
                    specifications = specifications.OrderByDescending(spec => spec.CreatedAt);
                    break;
            }

            var userSpecificationCount = await _specificationQueries.CountTotalUserSpecifications(user.Auth0Id);
            var shortenedSpecifications = _specificationResponseMapper.MapModelsToShortShortResponses(specifications);

            var response = PaginatedResponseFactory.Create(shortenedSpecifications, page, itemCount, userSpecificationCount);

            return Ok(response);
        }
    }
}