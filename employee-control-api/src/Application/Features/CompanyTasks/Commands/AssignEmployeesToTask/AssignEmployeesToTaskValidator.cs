using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.AssignEmployeesToTask;

public class AssignEmployeesToTaskValidator : AbstractValidator<AssignEmployeesToTaskCommand>
{
    public AssignEmployeesToTaskValidator()
    {
        RuleFor(r => r.EmployeeIds)
            .NotEmpty()
            .NotNull();

        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
