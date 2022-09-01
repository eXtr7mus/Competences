using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public enum IssueStatus 
    {
        New,
        Assigned,
        InProgress,
        Done,
        Closed,
        Cancelled
    }

    public enum IssuePriority 
    {
        Low,
        Medium,
        High,
        Critical
    }

    public class Issue
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public AppUser Creator { get; set; }
        public AppUser Assignee { get; set; }
        public IssueStatus Status { get; set; }
        public ICollection<IssueCompetence> Competences { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime Deadline { get; set; }
        public IssuePriority Priority { get; set; }

    }
}