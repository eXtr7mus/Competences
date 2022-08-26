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

namespace Application.Competences
{
    public class UpdateUserCompetence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public int KnowledgeLevel { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var competence = await _context.Competences
                    .Include(c => c.Users)
                    .ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (competence == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var userCompetence = competence.Users.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // if user doesn't have competence, add it to user
                if (userCompetence == null && request.KnowledgeLevel > 0)
                {
                    userCompetence = new UserCompetence
                    {
                        Competence = competence,
                        AppUser = user,
                        KnowledgeLevel = request.KnowledgeLevel,
                        CreationDate = DateTime.Now
                    };
                    competence.Users.Add(userCompetence);
                } 

                // if user has competence and provides knowledge level, we update it
                if (userCompetence != null && request.KnowledgeLevel > 0)
                    userCompetence.KnowledgeLevel = request.KnowledgeLevel;

                // if user has competence and doesn't provide knowlegde level, we remove it
                if (userCompetence != null && request.KnowledgeLevel == 0)
                    competence.Users.Remove(userCompetence);
                
                
                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to add competence");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}