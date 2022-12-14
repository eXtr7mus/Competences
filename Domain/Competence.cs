using System;
using System.Collections.Generic;

namespace Domain
{
    public class Competence
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<UserCompetence> Users { get; set; } = new List<UserCompetence>();
        public ICollection<IssueCompetence> Issues { get; set; } = new List<IssueCompetence>();
    }
}