using FluentValidation;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployeeRoles;

public class UpdateEmployeeRolesValidator : AbstractValidator<UpdateEmployeeRolesCommand>
{
    public UpdateEmployeeRolesValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
