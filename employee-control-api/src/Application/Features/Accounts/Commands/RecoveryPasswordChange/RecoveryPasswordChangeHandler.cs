using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeControl.Application.Features.Accounts.Commands.RecoveryPasswordChange;

internal class RecoveryPasswordChangeHandler(
        UserManager<ApplicationUser> userManager,
        IValidationFailureService validationFailureService,
        IStringLocalizer<IdentityLocalizer> localizer,
        ILogger<RecoveryPasswordChangeHandler> logger)
    : IRequestHandler<RecoveryPasswordChangeCommand, Result>
{
    public async Task<Result> Handle(RecoveryPasswordChangeCommand request, CancellationToken cancellationToken)
    {
        var code = Base64UrlEncoder.Decode(request.Code);
        var userId = Base64UrlEncoder.Decode(request.UserId);

        var user = await userManager.FindByIdAsync(userId);

        if (user is null)
        {
            var message = localizer["El usuario no existe."];
            logger.LogDebug("{message}", message);
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NonFieldErrors, message);
        }

        if (!user!.EmailConfirmed)
        {
            var message = localizer["El email no ha sido confirmado."];
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NonFieldErrors, message);
        }

        var resetResult = await userManager.ResetPasswordAsync(user, code, request.Password);
        var result = !resetResult.Succeeded ? Result.Failure(localizer["Error al cambiar la contraseña"]) : Result.Success();

        return result;
    }
}
