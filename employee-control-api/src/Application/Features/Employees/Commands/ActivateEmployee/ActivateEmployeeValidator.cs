using FluentValidation;

namespace EmployeeControl.Application.Features.Employees.Commands.ActivateEmployee;

public class ActivateEmployeeValidator : AbstractValidator<ActivateEmployeeCommand>
{
    public ActivateEmployeeValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
