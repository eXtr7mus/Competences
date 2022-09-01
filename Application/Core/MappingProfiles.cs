using Application.Competences;
using Application.Issues;
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

            CreateMap<UserCompetence, Profiles.ProfileDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.KnowledgeLevel, o => o.MapFrom(s => s.KnowledgeLevel))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.UserPhoto.Url));


            CreateMap<UserCompetence, Profiles.ProfileCompetenceDto>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Competence.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Competence.Name))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Competence.Category))
                .ForMember(d => d.KnowledgeLevel, o => o.MapFrom(s => s.KnowledgeLevel));
                
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.UserPhoto.Url));

            CreateMap<AppUser, IssueProfileDto>()
                .ForMember(d => d.Image, o => o.MapFrom(s => s.UserPhoto.Url));

            CreateMap<Profiles.Profile, AppUser>();

            CreateMap<IssueCompetence, IssueCompetenceDto>()
                .ForMember(d => d.CompetenceId, o => o.MapFrom(s => s.Competence.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Competence.Name))
                .ForMember(d => d.Category, o => o.MapFrom(s => s.Competence.Category))
                .ForMember(d => d.KnowledgePriority, o => o.MapFrom(s => s.KnowledgePriority));

            CreateMap<Issue, IssueDto>();
            CreateMap<IssueDto, Issue>().ForMember(d => d.CreationDate, o => o.Ignore());
                
        }
    }
}