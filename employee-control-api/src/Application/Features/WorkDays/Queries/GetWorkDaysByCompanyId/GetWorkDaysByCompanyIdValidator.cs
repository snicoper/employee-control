using FluentValidation;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkDaysByCompanyId;

public class GetWorkDaysByCompanyIdValidator : AbstractValidator<GetWorkDaysByCompanyIdQuery>
{
    public GetWorkDaysByCompanyIdValidator()
    {
        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
