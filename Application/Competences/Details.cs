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
    public class Details
    {
        public class Query: IRequest<Result<CompetenceDto>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompetenceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CompetenceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var competence = await _context.Competences
                .ProjectTo<CompetenceDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
                    
                
                return Result<CompetenceDto>.Success(competence);
            }
        }
    }
}