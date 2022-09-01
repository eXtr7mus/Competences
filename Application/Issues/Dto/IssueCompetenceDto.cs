using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Competences;

namespace Application.Issues
{
    public class IssueCompetenceDto
    {
        public Guid CompetenceId { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int KnowledgePriority { get; set; }
    }
}