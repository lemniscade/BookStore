using AuthenticationMicroservice.Models;
using AuthenticationMicroservice.Transactions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Address = AuthenticationMicroservice.Models.Address;
using System.Text.RegularExpressions;

namespace AuthenticationMicroservice.Controllers
{
    [ApiController]
    [Consumes("application/json")]
    [Route("api/[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly AuthenticationContext _context;
        private readonly IConfiguration _configuration;

        public RegisterController(AuthenticationContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("/registerUser")]
        public IActionResult CreateUser([FromBody] RegisterUserModel userRegister)
        {
            Dictionary<string, string> message = ValidationMessages(userRegister);
            if (message.Count != 0)
            {
                return Ok(new { errors = message });
            }
            string userName = userRegister.User.UserName;
            string email = userRegister.User.Email;
            Dictionary<string, string> sendMessages = new Dictionary<string, string>();
            if (userName != null && _context.Users.AsNoTracking().FirstOrDefault(x => x.UserName == userName) == null)
            {
                if (email != null && _context.Users.AsNoTracking().FirstOrDefault(x => x.Email == email) == null)
                {
                    TimeSpan oneHour = TimeSpan.FromHours(1);
                    DateTime now = DateTime.Now;
                    DateTime oneHourLater = now.Add(oneHour);
                    UserIdentity userforDB = new UserIdentity
                    {
                        UserName = userRegister.User.UserName,
                        Email = userRegister.User.Email,
                        PasswordHash = userRegister.User.PasswordHash,
                        Name = userRegister.User.Name,
                        Surname = userRegister.User.Surname,
                        PhoneNumber = userRegister.User.PhoneNumber,
                        Expiration = oneHourLater,
                        AccessToken = "",
                        RefreshToken = "",
                        RefreshTokenEndDate = now
                    };
                    Address adressofUser = new Address
                    {
                        AddressText = userRegister.Address.AddressText,
                        City = userRegister.Address.City,
                        District = userRegister.Address.District,
                        Neighbourhood = userRegister.Address.Neighbourhood
                    };
                    userforDB.Addresses = new List<Address> { adressofUser };
                    _context.Users.Add(userforDB);
                    _context.SaveChanges();
                    if (userName != null && _context.Users.FirstOrDefault(x => x.UserName == userName) != null)
                    {
                        IActionResult actionResult = CreateToken(userRegister.User);
                        if (actionResult is OkObjectResult okResult)
                        {
                            var tokenResult = okResult.Value as UserIdentity;
                            userforDB.AccessToken = tokenResult.AccessToken;
                            userforDB.RefreshToken = tokenResult.RefreshToken;
                            userforDB.RefreshTokenEndDate = tokenResult.RefreshTokenEndDate;
                            _context.SaveChanges();
                            return Ok(new { token = userforDB.AccessToken });
                        }
                    }
                }
                else
                {
                    sendMessages.Add("EmailRegistered", "User with email which chosen by you is already registered.");
                }
            }
            else
            {
                sendMessages.Add("UsernameRegistered", "User with username which chosen by you is already registered.");
            }
            if (sendMessages.Count != 0)
            {
                return Ok(new { errors = sendMessages });
            }

            return null;
        }

        public IActionResult CreateToken([FromBody] UserIdentity userLogin)
        {
            var passwordHasher = new PasswordHasher<UserIdentity>();
            UserIdentity user = _context.Users.AsNoTracking().FirstOrDefault(x => x.Email == userLogin.Email);

            if (user != null)
            {
                TokenTransaction tokenHandler = new TokenTransaction(_configuration);
                UserIdentity token = tokenHandler.CreateAccessToken(user);

                user.RefreshToken = token.RefreshToken;
                user.RefreshTokenEndDate = token.Expiration.AddMinutes(3);
                _context.SaveChanges();

                return Ok(token);
            }
            return null;
        }
        public Dictionary<string, string> ValidationMessages(RegisterUserModel userValidation)
        {
            UserIdentity user = userValidation.User;
            Address address = userValidation.Address;

            Dictionary<string, string> Messages = new Dictionary<string, string>()
        {
        { "SurnameRequired", "Surname area is required." },
        { "SurnameRegex", "Surname must be between 2 and 15 characters long and can only contains letter." },
        { "NameRequired", "Name area is required." },
        { "NameRegex", "Name must be between 2 and 15 characters long and can only contains letter." },
        { "UsernameRequired", "Username area is required." },
        { "UsernameLength", "Username must be between 2 and 15 characters long." },
        { "EmailRequired", "Email area is required." },
        { "EmailRegex", "Email is not valid." },
        { "PasswordRequired", "Password area is required." },
        { "PasswordRegex", "Password must be between 8-20 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character." },
        { "PhoneNumberRequired", "Phone number area is required."},
        { "PhoneNumberRegex", "Phone number must be 11 characters long without country code, can only contains number and can't start with zero." },
        { "AddressRequired", "Address area is required."},
        { "AddressLength", "Address must be between 20 and 250 characters long." },
        { "CityRequired", "City area is required."},
        { "DistrictRequired", "District area is required."},
        { "NeighbourhoodRequired", "Neighbourhood area is required."},
        };

            Dictionary<string, string> sendMessages = new Dictionary<string, string>();
            string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            string namePattern = @"^[\p{L}]{2,15}$";
            string phoneNumberPattern = @"^[1-9]\d{9}$";
            string passwordPattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,20}$";
            Regex emailRegex = new Regex(emailPattern);
            Regex nameRegex = new Regex(namePattern);
            Regex phoneNumberRegex = new Regex(phoneNumberPattern);
            Regex passwordRegex = new Regex(passwordPattern);
            if (user.UserName == null || user.UserName == "")
            {
                sendMessages.Add("UsernameRequired", Messages["UsernameRequired"]);
            }
            else if (!(user.UserName.Length <= 15 && user.UserName.Length >= 2))
            {
                sendMessages.Add("UsernameLength", Messages["UsernameLength"]);
            }
            if (user.Email == null || user.Email == "")
            {
                sendMessages.Add("EmailRequired", Messages["EmailRequired"]);
            }
            else if (!emailRegex.IsMatch(user.Email))
            {
                sendMessages.Add("EmailRegex", Messages["EmailRegex"]);
            }
            if (user.Name == null || user.Name == "")
            {
                sendMessages.Add("NameRequired", Messages["NameRequired"]);
            }
            else if (!nameRegex.IsMatch(user.Name))
            {
                sendMessages.Add("NameRegex", Messages["NameRegex"]);
            }
            if (user.Surname == null || user.Surname == "")
            {
                sendMessages.Add("SurnameRequired", Messages["SurnameRequired"]);
            }
            else if (!nameRegex.IsMatch(user.Surname))
            {
                sendMessages.Add("SurnameRegex", Messages["SurnameRegex"]);
            }
            if (user.PasswordHash == null || user.PasswordHash == "")
            {
                sendMessages.Add("PasswordRequired", Messages["PasswordRequired"]);
            }
            else if (!passwordRegex.IsMatch(user.PasswordHash))
            {
                sendMessages.Add("PasswordRegex", Messages["PasswordRegex"]);
            }
            if (user.PhoneNumber == null || user.PhoneNumber == "")
            {
                sendMessages.Add("PhoneNumberRequired", Messages["PhoneNumberRequired"]);
            }
            else if (!phoneNumberRegex.IsMatch(user.PhoneNumber))
            {
                sendMessages.Add("PhoneNumberRegex", Messages["PhoneNumberRegex"]);
            }
            if (address.AddressText == null || address.AddressText == "")
            {
                sendMessages.Add("AddressRequired", Messages["AddressRequired"]);
            }
            else if (!(address.AddressText.Length <= 250 && address.AddressText.Length >= 20))
            {
                sendMessages.Add("AddressLength", Messages["AddressLength"]);
            }
            if (address.City == null || address.City == "")
            {
                sendMessages.Add("CityRequired", Messages["CityRequired"]);
            }
            if (address.District == null || address.District == "")
            {
                sendMessages.Add("DistrictRequired", Messages["DistrictRequired"]);
            }
            if (address.Neighbourhood == null || address.Neighbourhood == "")
            {
                sendMessages.Add("NeighbourhoodRequired", Messages["NeighbourhoodRequired"]);
            }
            return sendMessages;
        }
    }
}
