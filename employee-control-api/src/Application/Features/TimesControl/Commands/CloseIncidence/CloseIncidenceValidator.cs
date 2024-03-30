using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CloseIncidence;

public class CloseIncidenceValidator : AbstractValidator<CloseIncidenceCommand>
{
    public CloseIncidenceValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
