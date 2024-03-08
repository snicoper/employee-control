using FluentValidation;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.UpdateCategoryAbsence;

public class UpdateCategoryAbsenceValidator : AbstractValidator<UpdateCategoryAbsenceCommand>
{
    public UpdateCategoryAbsenceValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Description)
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(r => r.Background)
            .NotEmpty();

        RuleFor(r => r.Color)
            .NotEmpty();
    }
}
