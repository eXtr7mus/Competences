using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Competence> Competences { get; set; }
        public DbSet<UserCompetence> UserCompetences { get; set; }
        public DbSet<Photo> Photos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserCompetence>(x => x.HasKey(c => new {c.AppUserId, c.CompetenceId}));

            builder.Entity<UserCompetence>()
                .HasOne(u => u.AppUser)
                .WithMany(c => c.Competences)
                .HasForeignKey(cc => cc.AppUserId);

            builder.Entity<UserCompetence>()
                .HasOne(u => u.Competence)
                .WithMany(c => c.Users)
                .HasForeignKey(cc => cc.CompetenceId);
        }
    }
}