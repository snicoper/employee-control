using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Commands.CreateDepartment;

public class CreateDepartmentValidator : AbstractValidator<CreateDepartmentCommand>
{
    public CreateDepartmentValidator()
    {
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
