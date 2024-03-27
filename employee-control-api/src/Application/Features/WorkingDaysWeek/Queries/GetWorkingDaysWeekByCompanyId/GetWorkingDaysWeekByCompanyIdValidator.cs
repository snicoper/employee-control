using FluentValidation;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeekByCompanyId;

public class GetWorkingDaysWeekByCompanyIdValidator : AbstractValidator<GetWorkingDaysWeekByCompanyIdQuery>
{
    public GetWorkingDaysWeekByCompanyIdValidator()
    {
        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
