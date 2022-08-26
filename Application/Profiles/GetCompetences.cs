using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Competences;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class GetCompetences
    {
        public class Query: IRequest<Result<List<ProfileCompetenceDto>>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ProfileCompetenceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ProfileCompetenceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.UserCompetences
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Competence.Name)
                    .ProjectTo<ProfileCompetenceDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                var competences = await query.ToListAsync();

                return Result<List<ProfileCompetenceDto>>.Success(competences);
            }
        }
    }
}