using EmployeeControl.Application.Localizations;
using FluentValidation;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Application.Features.Accounts.Commands.RegisterAccount;

public class RegisterAccountValidator : AbstractValidator<RegisterAccountCommand>
{
    public RegisterAccountValidator(IStringLocalizer<IdentityLocalizer> localizer)
    {
        RuleFor(r => r.FirstName)
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(r => r.LastName)
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(r => r.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(256);

        RuleFor(r => r.Password)
            .NotEmpty()
            .MinimumLength(6)
            .Equal(r => r.ConfirmPassword)
            .WithMessage(localizer["Las contraseñas no coinciden."]);

        RuleFor(r => r.ConfirmPassword)
            .NotEmpty()
            .Equal(r => r.Password)
            .WithMessage(localizer["Las contraseñas no coinciden."]);

        RuleFor(r => r.CompanyName)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(r => r.Timezone)
            .NotEmpty();
    }
}
