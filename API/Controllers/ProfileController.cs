using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Application.Profiles;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ Username = username }));
        }
    
        [HttpGet("{username}/competences")]
        public async Task<IActionResult> GetProfileCompetences(string username)
        {
            return HandleResult(await Mediator.Send(new GetCompetences.Query{ Username = username }));
        }
    }
}