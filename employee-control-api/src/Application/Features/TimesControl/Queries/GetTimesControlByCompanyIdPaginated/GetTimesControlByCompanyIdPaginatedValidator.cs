using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByCompanyIdPaginated;

public class GetTimesControlByCompanyIdPaginatedValidator : AbstractValidator<GetTimesControlByCompanyIdPaginatedQuery>
{
    public GetTimesControlByCompanyIdPaginatedValidator()
    {
        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
