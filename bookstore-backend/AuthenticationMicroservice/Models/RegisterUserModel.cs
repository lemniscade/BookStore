namespace AuthenticationMicroservice.Models
{
    public class RegisterUserModel
        {
            public UserIdentity User { get; set; }
            public Address Address { get; set; }
        }
}
