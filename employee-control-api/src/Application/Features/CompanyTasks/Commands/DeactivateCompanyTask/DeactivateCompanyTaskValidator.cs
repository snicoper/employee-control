using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.DeactivateCompanyTask;

public class DeactivateCompanyTaskValidator : AbstractValidator<DeactivateCompanyTaskCommand>
{
    public DeactivateCompanyTaskValidator()
    {
        RuleFor(r => r.CompanyTaskId)
            .NotEmpty();
    }
}
