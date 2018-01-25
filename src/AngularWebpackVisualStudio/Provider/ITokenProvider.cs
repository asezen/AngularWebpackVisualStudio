using System;
using Angular2WebpackVisualStudio.Models;
using Microsoft.IdentityModel.Tokens;



namespace Angular2WebpackVisualStudio.Provider
{
    public interface  ITokenProvider
    {
        string CreateToken(User user, DateTime expiry);

        // TokenValidationParameters is from Microsoft.IdentityModel.Tokens
        TokenValidationParameters GetValidationParameters();
    }
}