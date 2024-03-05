using FluentValidation;

namespace EmployeeControl.Application.Features.Accounts.Commands.RecoveryPassword;

public class RecoveryPasswordValidator : AbstractValidator<RecoveryPasswordCommand>
{
    public RecoveryPasswordValidator()
    {
        RuleFor(r => r.Email)
            .NotEmpty()
            .EmailAddress();
    }
}
