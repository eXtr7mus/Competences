namespace Application.Profiles
{
    //Dto to get profiles for competence details
    public class ProfileDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public int KnowledgeLevel { get; set; }

    }
}