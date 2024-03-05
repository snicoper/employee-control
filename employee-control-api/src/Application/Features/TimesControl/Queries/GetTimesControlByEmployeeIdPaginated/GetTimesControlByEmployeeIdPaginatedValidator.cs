using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByEmployeeIdPaginated;

public class GetTimesControlByEmployeeIdPaginatedValidator : AbstractValidator<GetTimesControlByEmployeeIdPaginatedQuery>
{
    public GetTimesControlByEmployeeIdPaginatedValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
