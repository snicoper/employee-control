using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateByEmployeeId;

public class GetTimeStateByEmployeeIdValidator : AbstractValidator<GetTimeStateByEmployeeIdQuery>
{
    public GetTimeStateByEmployeeIdValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
