using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Commands.ActivateDepartment;

public class ActivateDepartmentValidator : AbstractValidator<ActivateDepartmentCommand>
{
    public ActivateDepartmentValidator()
    {
        RuleFor(r => r.DepartmentId)
            .NotEmpty();
    }
}
