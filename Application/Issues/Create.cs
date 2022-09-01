using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Issues
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Issue Issue { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Issue).SetValidator(new IssueValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                    
                var issue = request.Issue;

                issue.Creator = currentUser;
                issue.Status = IssueStatus.New;
                issue.CreationDate = DateTime.UtcNow;

                _context.Issues.Add(request.Issue);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create competence");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}