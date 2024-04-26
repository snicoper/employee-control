using FluentValidation;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.CreateCategoryAbsence;

public class CreateCategoryAbsenceValidator : AbstractValidator<CreateCategoryAbsenceCommand>
{
    public CreateCategoryAbsenceValidator()
    {
        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(r => r.Background)
            .NotEmpty()
            .MaximumLength(7);

        RuleFor(r => r.Color)
            .NotEmpty()
            .MaximumLength(7);

        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
