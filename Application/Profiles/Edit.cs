using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Profile Profile { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }
        
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appUser = await _context.Users.Include(x => x.UserPhoto)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                _mapper.Map(request.Profile, appUser);

                _context.Entry(appUser).State = EntityState.Modified;

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Unit>.Success(Unit.Value);
                
                return Result<Unit>.Failure("Problem editing user");
            }
        }
    }
}