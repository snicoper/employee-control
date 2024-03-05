using FluentValidation;

namespace EmployeeControl.Application.Features.Employees.Commands.DeactivateEmployee;

public class DeactivateEmployeeValidator : AbstractValidator<DeactivateEmployeeCommand>
{
    public DeactivateEmployeeValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
