export class User {
    RefreshToken?: string;
    RefreshTokenEndDate?: Date;
    UserName: string;
    Name: string;
    Surname: string;
    Email: string;
    EmailConfirmed?: boolean;
    PasswordHash: string;
    PhoneNumber: string;
    PhoneNumberConfirmed?: boolean;
    TwoFactorEnabled?: boolean;
    LockoutEnabled?: boolean;
    LockoutEndDate?: Date;
    AccessToken?: string;
    Expiration?: Date;
}