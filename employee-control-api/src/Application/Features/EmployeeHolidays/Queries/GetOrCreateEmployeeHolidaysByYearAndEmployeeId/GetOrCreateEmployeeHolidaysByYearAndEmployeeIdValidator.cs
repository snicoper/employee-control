using FluentValidation;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetOrCreateEmployeeHolidaysByYearAndEmployeeId;

public class GetOrCreateEmployeeHolidaysByYearAndEmployeeIdValidator : AbstractValidator<
    GetOrCreateEmployeeHolidaysByYearAndEmployeeIdQuery>
{
    public GetOrCreateEmployeeHolidaysByYearAndEmployeeIdValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
