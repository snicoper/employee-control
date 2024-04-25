using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.UpdateCompanyCalendarHoliday;

public class UpdateCompanyCalendarHolidayValidator : AbstractValidator<UpdateCompanyCalendarHolidayCommand>
{
    public UpdateCompanyCalendarHolidayValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(50);
    }
}
