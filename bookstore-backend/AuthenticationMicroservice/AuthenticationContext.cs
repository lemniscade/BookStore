using AuthenticationMicroservice.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace AuthenticationMicroservice
{
    public class AuthenticationContext : IdentityDbContext<UserIdentity, RoleIdentity, int>
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options) : base(options) { }
        public DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            
            builder.Entity<UserIdentity>(entity =>
            {
                entity.ToTable("AspNetUsers"); 
            });

            
            builder.Entity<Address>()
                .HasOne(a => a.User)           
                .WithMany(u => u.Addresses)    
                .HasForeignKey(a => a.UserId) 
                .OnDelete(DeleteBehavior.Restrict);

            //builder.Entity<UserIdentity>(entity =>
            //{
            //    entity.Property(e => e.UserName)
            //          .HasMaxLength(15)
            //          .IsRequired();    
            //});
        }
    }
}
