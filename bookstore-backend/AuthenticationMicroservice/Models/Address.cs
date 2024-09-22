using AuthenticationMicroservice.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthenticationMicroservice.Models
{
    public class Address
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Address is required.")]
        [StringLength(250, MinimumLength = 20, ErrorMessage = "Address must be between 2 and 15 characters long.")]
        public string AddressText { get; set; }
        [Required(ErrorMessage = "City is required.")]
        public string City { get; set; }
        [Required(ErrorMessage = "District is required.")]
        public string District { get; set; }
        [Required(ErrorMessage = "Neighbourhood is required.")]
        public string Neighbourhood { get; set; }
        
        public int UserId { get; set; }
        [Required]
        public UserIdentity User { get; set; }

    }
}
