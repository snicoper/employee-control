using FluentValidation;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

public class GetTimeControlByIdValidator : AbstractValidator<GetTimeControlByIdQuery>
{
    public GetTimeControlByIdValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
