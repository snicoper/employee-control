using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models.Settings;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace EmployeeControl.Infrastructure.Services.Features.Identity;

public class AuthService(
        UserManager<ApplicationUser> userManager,
        IOptions<JwtSettings> jwtSettings,
        ITokenService tokenService,
        IDateTimeService dateTimeService,
        IStringLocalizer<IdentityLocalizer> localizer,
        IValidationFailureService validationFailureService)
    : IAuthService
{
    public async Task<(string AccessToken, string RefreshToken)> LoginAsync(string email, string password)
    {
        var user = userManager.Users.SingleOrDefault(au => au.Email == email);

        // Validación de usuario y password, 401 si no es valido el login.
        if (user is null || !await userManager.CheckPasswordAsync(user, password))
        {
            throw new UnauthorizedAccessException();
        }

        // Validación email confirmado.
        if (!user.EmailConfirmed)
        {
            var message = localizer["El correo esta pendiente de validación desde tu bandeja de correo."];
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NonFieldErrors, message);
        }

        // Validación cuenta activa.
        if (!user.Active)
        {
            var message = localizer["La cuenta no esta activa, debes hablar con un responsable de tu empresa."];
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NonFieldErrors, message);
        }

        var tokensResult = await GenerateUserTokenAsync(user);

        return tokensResult;
    }

    public async Task<(string AccessToken, string RefreshToken)> RefreshTokenAsync(string refreshToken)
    {
        var user = userManager.Users.SingleOrDefault(au => au.RefreshToken == refreshToken);

        if (user is null || !user.Active || user.RefreshTokenExpiryTime <= dateTimeService.UtcNow)
        {
            throw new UnauthorizedAccessException();
        }

        var tokensResult = await GenerateUserTokenAsync(user);

        return tokensResult;
    }

    private async Task<(string AccessToken, string RefreshToken)> GenerateUserTokenAsync(ApplicationUser user)
    {
        var jwt = await tokenService.GenerateAccessTokenAsync(user);
        var newRefreshToken = tokenService.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = dateTimeService.UtcNow.AddDays(jwtSettings.Value.RefreshTokenLifeTimeDays);

        await userManager.UpdateAsync(user);

        return (jwt, newRefreshToken);
    }
}
