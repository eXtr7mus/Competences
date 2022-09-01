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
    public class Details
    {
        public class Query : IRequest<Result<IssueDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IssueDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<IssueDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var issues = await _context.Issues
                    .ProjectTo<IssueDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                 return Result<IssueDto>.Success( issues );
            }
        }
    }
}