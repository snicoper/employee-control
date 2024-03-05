using EmployeeControl.Application.Features.TimesControl.Commands.StartTimeControl;
using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControlByStaff;

public class FinishTimeControlByStaffValidator : AbstractValidator<StartTimeControlCommand>
{
    public FinishTimeControlByStaffValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
