using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class IssueCompetence
    {
        public Guid CompetenceId { get; set; }
        public Competence Competence { get; set; }
        public Guid IssueId { get; set; }
        public Issue Issue { get; set; }
        public int KnowledgePriority { get; set; }
    }
}