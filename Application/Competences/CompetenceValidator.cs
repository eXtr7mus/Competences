
using Domain;
using FluentValidation;

namespace Application.Competences
{
    public class CompetenceValidator : AbstractValidator<Competence>
    {
        public CompetenceValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.CreationDate).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
        }
    }
}