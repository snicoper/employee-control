using FluentValidation;

namespace EmployeeControl.Application.Features.Accounts.Commands.RegisterValidateEmail;

public class RegisterValidateEmailValidator : AbstractValidator<RegisterValidateEmailCommand>
{
    public RegisterValidateEmailValidator()
    {
        RuleFor(r => r.Code)
            .NotEmpty();

        RuleFor(r => r.UserId)
            .NotEmpty();
    }
}
