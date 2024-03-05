using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Commands.UpdateDepartment;

public class UpdateDepartmentValidator : AbstractValidator<UpdateDepartmentCommand>
{
    public UpdateDepartmentValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(r => r.Background)
            .NotEmpty()
            .MaximumLength(7);

        RuleFor(r => r.Color)
            .NotEmpty()
            .MaximumLength(7);
    }
}
