using IdentityServer4.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AuthenticationMicroservice.Models
{
    public class UserIdentity : IdentityUser<int>
    {
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$")]
        public override string PasswordHash { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]
        public override string Email { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z]{2,15}$")]
        public string Name { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 2)]
        public override string UserName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 2)]
        [RegularExpression(@"^[a-zA-Z]{2,15}$")]
        public string Surname { get; set; }

        [Required]
        [StringLength(13, MinimumLength = 13)]
        [RegularExpression(@"^[1-9]\d{9}$")]
        public override string PhoneNumber { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenEndDate { get; set; }
        public string AccessToken { get; set; }
        public DateTime Expiration { get; set; }
        public ICollection<Address> Addresses { get; set; }

       
    }


}
