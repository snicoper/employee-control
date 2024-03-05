using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Application.Features.Accounts.Commands.ResendEmailValidation;

internal class ResendEmailValidationHandler(
        UserManager<ApplicationUser> userManager,
        IIdentityEmailsService identityEmailsService,
        IStringLocalizer<IdentityLocalizer> localizer)
    : IRequestHandler<ResendEmailValidationCommand, Result>
{
    public async Task<Result> Handle(ResendEmailValidationCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .Include(au => au.Company)
            .SingleOrDefaultAsync(au => au.Id == request.UserId, cancellationToken);

        if (user is null)
        {
            var message = localizer["El usuario no existe en la base de datos."];

            return Result.Failure(message);
        }

        if (user.EmailConfirmed)
        {
            var message = localizer["El usuario ya ha confirmado el correo electrónico."];

            return Result.Failure(message);
        }

        if (user.Company is null)
        {
            var message = localizer["El usuario debe pertenecer a una empresa."];

            return Result.Failure(message);
        }

        // Generar code de validación y enviar email.
        var code = await userManager.GenerateEmailConfirmationTokenAsync(user);
        await identityEmailsService.SendValidateEmailAsync(user, user.Company, code);

        return Result.Success();
    }
}
