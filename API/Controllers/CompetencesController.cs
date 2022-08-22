using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Competences;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CompetencesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCompetences() {
             return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompetence(Guid id) {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }
        [HttpPost]
        public async Task<IActionResult> CreateCompetence(Competence competence) {
            return HandleResult(await Mediator.Send(new Create.Command{Competence = competence}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompetence(Guid id) {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompetence(Guid id, Competence competence) {
            competence.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Competence = competence}));
        }
        [HttpPost("{id}/adduser")]
        public async Task<IActionResult> AddUser(Guid id, int knowledgeLevel)
        {
            return HandleResult(await Mediator.Send(new UpdateUserCompetence.Command{Id = id, KnowledgeLevel = knowledgeLevel}));
        }
    }
}