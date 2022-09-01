using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Issues
{
    public class AddCompetence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public Guid CompetenceId { get; set; }
            public int KnowledgePriority { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var competence = await _context.Competences
                    .SingleOrDefaultAsync(x => x.Id == request.CompetenceId);

                if (competence == null) return null;

                var issue = await _context.Issues
                    .Include(x => x.Competences)
                    .ThenInclude(c => c.Competence)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (issue == null) return null;

                var issueCompetence = issue.Competences
                    .FirstOrDefault(x => x.CompetenceId == competence.Id);

                if (issueCompetence == null && request.KnowledgePriority > 0)
                {
                    issueCompetence = new IssueCompetence
                    {
                        Competence = competence,
                        KnowledgePriority = request.KnowledgePriority,
                    };
                    issue.Competences.Add(issueCompetence);
                } 

                if (issueCompetence != null && request.KnowledgePriority > 0)
                    issueCompetence.KnowledgePriority = request.KnowledgePriority;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add competence");

                return Result<Unit>.Success(Unit.Value);
                
            }
        }
    }

}