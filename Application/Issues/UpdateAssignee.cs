using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Issues
{
    public class UpdateAssignee
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public string Username { get; set; }
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
                var issue = await _context.Issues.FindAsync(request.Id);

                if (issue == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username);

                if (user == null) return null;

                issue.Assignee = user;
                

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Problem assigning user to issue");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}