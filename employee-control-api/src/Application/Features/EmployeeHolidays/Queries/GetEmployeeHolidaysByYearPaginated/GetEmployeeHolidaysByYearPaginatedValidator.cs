using FluentValidation;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

public class GetEmployeeHolidaysByYearPaginatedValidator : AbstractValidator<GetEmployeeHolidaysByYearPaginatedQuery>
{
    public GetEmployeeHolidaysByYearPaginatedValidator()
    {
        RuleFor(r => r.Year)
            .NotEmpty();
    }
}
