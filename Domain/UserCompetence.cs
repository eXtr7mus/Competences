using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserCompetence
    {
        public Guid CompetenceId { get; set; }
        public Competence Competence { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int KnowledgeLevel { get; set; }
        public DateTime CreationDate { get; set; }
    }
}