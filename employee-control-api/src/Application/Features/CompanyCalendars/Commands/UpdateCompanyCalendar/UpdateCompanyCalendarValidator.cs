using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.UpdateCompanyCalendar;

public class UpdateCompanyCalendarValidator : AbstractValidator<UpdateCompanyCalendarCommand>
{
    public UpdateCompanyCalendarValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Name)
            .MaximumLength(50)
            .NotEmpty();

        RuleFor(r => r.Description)
            .MaximumLength(256)
            .NotEmpty();
    }
}
