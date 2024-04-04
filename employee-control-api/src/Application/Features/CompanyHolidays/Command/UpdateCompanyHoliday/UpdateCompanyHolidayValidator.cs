using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.UpdateCompanyHoliday;

public class UpdateCompanyHolidayValidator : AbstractValidator<UpdateCompanyHolidayCommand>
{
    public UpdateCompanyHolidayValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(50);
    }
}
