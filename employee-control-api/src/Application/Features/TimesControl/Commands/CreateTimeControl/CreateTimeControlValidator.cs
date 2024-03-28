using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateTimeControl;

public class CreateTimeControlValidator : AbstractValidator<CreateTimeControlCommand>
{
    public CreateTimeControlValidator()
    {
        RuleFor(r => r.UserId)
            .NotEmpty();

        RuleFor(r => r.Start)
            .NotEmpty();

        RuleFor(r => r.Finish)
            .NotEmpty();

        RuleFor(r => r.DeviceType)
            .NotEmpty();

        RuleFor(r => r.TimeState)
            .NotEmpty();
    }
}
