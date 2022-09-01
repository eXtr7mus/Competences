using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Issues
{
    public class Edit
    {
        public class Command: IRequest<Result<Unit>>
        {
            public IssueDto Issue { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var issue = await _context.Issues
                    .SingleOrDefaultAsync(x => x.Id == request.Issue.Id);

                if (issue == null) return null;

                _mapper.Map(request.Issue, issue);

           //     _context.Entry(issue).State = EntityState.Modified;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                
                return Result<Unit>.Failure("Problem editing user");
            }
        }
    }
}