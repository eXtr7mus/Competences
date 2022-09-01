using System;
using System.Collections.Generic;
using Domain;

namespace Application.Issues
{
    public class IssueDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IssueProfileDto Creator { get; set; }
        public IssueProfileDto Assignee { get; set; }
        public IssueStatus Status { get; set; }
        public ICollection<IssueCompetenceDto> Competences { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime Deadline { get; set; }
        public IssuePriority Priority { get; set; }
    }
}