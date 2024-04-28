using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.SetDefaultCalendar;

public class SetDefaultCalendarValidator : AbstractValidator<SetDefaultCalendarCommand>
{
    public SetDefaultCalendarValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
