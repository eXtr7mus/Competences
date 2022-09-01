using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;

namespace Application.Issues
{
    public class IssueValidator : AbstractValidator<Issue>
    {
        public IssueValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
        }
    }
}