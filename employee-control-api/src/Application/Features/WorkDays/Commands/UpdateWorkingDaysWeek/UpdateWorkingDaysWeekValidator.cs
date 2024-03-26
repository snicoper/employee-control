using FluentValidation;

namespace EmployeeControl.Application.Features.WorkDays.Commands.UpdateWorkingDaysWeek;

public class UpdateWorkingDaysWeekValidator : AbstractValidator<UpdateWorkingDaysWeekCommand>
{
    public UpdateWorkingDaysWeekValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
