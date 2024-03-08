using FluentValidation;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceById;

public class GetCategoryAbsenceByIdValidator : AbstractValidator<GetCategoryAbsenceByIdQuery>
{
    public GetCategoryAbsenceByIdValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
