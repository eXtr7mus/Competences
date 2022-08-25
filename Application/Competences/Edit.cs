using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Competences
{
    public class Edit
    {
        public class Command: IRequest<Result<Unit>> {
            public Competence Competence { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Competence).SetValidator(new CompetenceValidator());
            }
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
                var competence = await _context.Competences.FindAsync(request.Competence.Id);

                if (competence == null) return null;

                _mapper.Map(request.Competence, competence);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update competence");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}