using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Issues
{
    public class List
    {
        public class Query : IRequest<Result<List<IssueDto>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<List<IssueDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<List<IssueDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var issues = await _context.Issues
                    .ProjectTo<IssueDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                 return Result<List<IssueDto>>.Success( issues );
            }
        }
    }
}