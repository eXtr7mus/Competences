using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Competences
{
    public class List
    {
        public class Query : IRequest<Result<List<CompetenceDto>>> {

        }

        public class Handler : IRequestHandler<Query, Result<List<CompetenceDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<CompetenceDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var competences = await _context.Competences
                    .ProjectTo<CompetenceDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                 return Result<List<CompetenceDto>>.Success( competences );
            }
        }
    }
}