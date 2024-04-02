using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.CreateCompanyHoliday;

public class CreateCompanyHolidayValidator : AbstractValidator<CreateCompanyHolidayCommand>
{
    public CreateCompanyHolidayValidator()
    {
        RuleFor(r => r.Date)
            .NotEmpty();

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(50);

        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
