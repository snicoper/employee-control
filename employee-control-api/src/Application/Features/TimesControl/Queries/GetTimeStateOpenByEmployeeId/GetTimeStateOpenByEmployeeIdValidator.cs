using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateOpenByEmployeeId;

public class GetTimeStateOpenByEmployeeIdValidator : AbstractValidator<GetTimeStateOpenByEmployeeIdQuery>
{
    public GetTimeStateOpenByEmployeeIdValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
