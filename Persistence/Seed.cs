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
            
            if (!userManager.Users.Any() && !context.Competences.Any())
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
            
                await context.Competences.AddRangeAsync(competences);
                await context.SaveChangesAsync();
            }
            
        }
    }
}