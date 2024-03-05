using FluentValidation;

namespace EmployeeControl.Application.Features.Accounts.Commands.ResendEmailValidation;

public class ResendEmailValidationValidator : AbstractValidator<ResendEmailValidationCommand>
{
    public ResendEmailValidationValidator()
    {
        RuleFor(r => r.UserId)
            .NotEmpty();
    }
}
