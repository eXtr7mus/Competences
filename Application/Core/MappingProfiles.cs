using Application.Competences;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Competence, Competence>();
            CreateMap<Competence, CompetenceDto>();
            CreateMap<UserCompetence, Profiles.Profile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.KnowledgeLevel, o => o.MapFrom(s => s.KnowledgeLevel));
                
        }
    }
}