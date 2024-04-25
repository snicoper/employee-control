using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.CreateCompanyCalendarHoliday;

public class CreateCompanyCalendarHolidayValidator : AbstractValidator<CreateCompanyCalendarHolidayCommand>
{
    public CreateCompanyCalendarHolidayValidator()
    {
        RuleFor(r => r.Date)
            .NotEmpty();

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(50);
    }
}
