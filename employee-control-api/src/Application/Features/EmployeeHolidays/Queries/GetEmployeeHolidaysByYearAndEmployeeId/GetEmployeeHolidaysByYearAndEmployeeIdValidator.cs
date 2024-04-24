using FluentValidation;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearAndEmployeeId;

public class GetEmployeeHolidaysByYearAndEmployeeIdValidator : AbstractValidator<GetEmployeeHolidaysByYearAndEmployeeIdQuery>
{
    public GetEmployeeHolidaysByYearAndEmployeeIdValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
