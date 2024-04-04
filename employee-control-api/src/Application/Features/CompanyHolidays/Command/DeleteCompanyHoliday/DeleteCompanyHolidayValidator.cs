using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.DeleteCompanyHoliday;

public class DeleteCompanyHolidayValidator : AbstractValidator<DeleteCompanyHolidayCommand>
{
    public DeleteCompanyHolidayValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
