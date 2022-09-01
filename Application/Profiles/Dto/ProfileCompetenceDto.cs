using System;

namespace Application.Profiles
{
    //Dto to get competences for user profile
    public class ProfileCompetenceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int KnowledgeLevel { get; set; }
    }
}