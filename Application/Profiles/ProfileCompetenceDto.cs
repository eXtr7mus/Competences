using System;

namespace Application.Profiles
{
    public class ProfileCompetenceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int KnowledgeLevel { get; set; }
    }
}