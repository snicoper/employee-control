using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.CreateCompanyCalendar;

public class CreateCompanyCalendarValidator : AbstractValidator<CreateCompanyCalendarCommand>
{
    public CreateCompanyCalendarValidator()
    {
        RuleFor(r => r.Name)
            .NotEmpty()
            .MaximumLength(25);

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(256);
    }
}
