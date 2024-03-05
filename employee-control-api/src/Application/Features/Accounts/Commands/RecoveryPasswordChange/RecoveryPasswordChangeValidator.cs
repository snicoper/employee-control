using EmployeeControl.Application.Localizations;
using FluentValidation;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Application.Features.Accounts.Commands.RecoveryPasswordChange;

public class RecoveryPasswordChangeValidator : AbstractValidator<RecoveryPasswordChangeCommand>
{
    public RecoveryPasswordChangeValidator(IStringLocalizer<IdentityLocalizer> localizer)
    {
        RuleFor(r => r.Password)
            .NotEmpty()
            .MinimumLength(6)
            .Equal(r => r.ConfirmPassword)
            .WithMessage(localizer["Las contraseñas no coinciden."]);

        RuleFor(r => r.ConfirmPassword)
            .NotEmpty()
            .Equal(r => r.Password)
            .WithMessage(localizer["Las contraseñas no coinciden."]);
    }
}
