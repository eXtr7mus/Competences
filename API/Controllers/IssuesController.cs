using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Issues;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IssuesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetIssues() 
        {
             return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssue(Guid id) 
        {
             return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateIssue(Issue issue) 
        {
             return HandleResult(await Mediator.Send(new Create.Command{Issue = issue}));
        }
        [HttpPost("{id}/addCompetence")]
        public async Task<IActionResult> AddCompetence(Guid id, IssueCompetenceDto issueCompetenceDto)
        {
            return HandleResult(await Mediator.Send(new AddCompetence.Command
                {
                    Id = id, 
                    CompetenceId = issueCompetenceDto.CompetenceId, 
                    KnowledgePriority = issueCompetenceDto.KnowledgePriority
                }));
        }

        [HttpDelete("{id}/deleteCompetence/{competenceId}")]
        public async Task<IActionResult> DeleteCompetence(Guid id, Guid competenceId)
        {
            return HandleResult(await Mediator.Send(new DeleteCompetence.Command
                {
                    Id = id, 
                    CompetenceId = competenceId, 
                }));
        }

        [HttpPost("{id}/updateAssignee")]
        public async Task<IActionResult> UpdateAssignee(Guid id, string username)
        {
            return HandleResult(await Mediator.Send(new UpdateAssignee.Command{Id = id, Username = username}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompetence(Guid id, IssueDto issue) {
            issue.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Issue  = issue}));
        }
    }
}