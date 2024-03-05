using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Commands.AssignEmployeesToDepartment;

public class AssignEmployeesToDepartmentValidator : AbstractValidator<AssignEmployeesToDepartmentCommand>
{
    public AssignEmployeesToDepartmentValidator()
    {
        RuleFor(r => r.EmployeeIds)
            .NotEmpty()
            .NotNull();

        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
