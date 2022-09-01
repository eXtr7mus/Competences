using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager) 
        {
            
            if (!userManager.Users.Any() && !context.Competences.Any() && !context.Issues.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Bob", UserName = "bob", Email = "bob@test.com"},
                    new AppUser{DisplayName = "Tom", UserName = "tom", Email = "tom@test.com"},
                    new AppUser{DisplayName = "Jane", UserName = "jane", Email = "jane@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            

                var competences = new List<Competence>{
                    new Competence {
                        Name = "C#",
                        Description = "C# .Net competence",
                        Category = "Programming language",
                        CreationDate = DateTime.Now,
                        Users = new List<UserCompetence> 
                        {
                            new UserCompetence
                            {
                                AppUser = users[0],
                                KnowledgeLevel = 3
                            }
                        }
                    },
                    new Competence {
                        Name = "Java",
                        Description = "Java competence",
                        Category = "Programming language",
                        CreationDate = DateTime.Now,
                        Users = new List<UserCompetence> 
                        {
                            new UserCompetence
                            {
                                AppUser = users[1],
                                KnowledgeLevel = 2
                            }
                        }
                    }
                };

                var issues = new List<Issue>{
                    new Issue 
                    {
                        Title = "Create app",
                        Description = "Create app for marketing with c# and java",
                        Creator = users[0],
                        Status = IssueStatus.New,
                        Priority = IssuePriority.Medium,
                        CreationDate = DateTime.UtcNow,
                        Deadline = DateTime.UtcNow.AddDays(4),
                        Competences = new List<IssueCompetence>
                        {
                            new IssueCompetence
                            {
                                Competence = competences[0],
                                KnowledgePriority = 3
                            },
                            new IssueCompetence
                            {
                                Competence = competences[1],
                                KnowledgePriority = 1
                            }
                        }
                    },

                    new Issue 
                    {
                        Title = "agwegawe apawegawegp",
                        Description = "Create aweg for aweg with c#",
                        Creator = users[0],
                        Status = IssueStatus.InProgress,
                        Priority = IssuePriority.Medium,
                        CreationDate = DateTime.UtcNow,
                        Deadline = DateTime.UtcNow.AddDays(6),
                        Competences = new List<IssueCompetence>
                        {
                            new IssueCompetence
                            {
                                Competence = competences[0],
                                KnowledgePriority = 4
                            }
                        }
                    }
                };
            
                await context.Issues.AddRangeAsync(issues);
                await context.Competences.AddRangeAsync(competences);
                await context.SaveChangesAsync();
            }
            
        }
    }
}