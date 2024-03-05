using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.ActivateCompanyTask;

public class ActivateCompanyTaskValidator : AbstractValidator<ActivateCompanyTaskCommand>
{
    public ActivateCompanyTaskValidator()
    {
        RuleFor(r => r.CompanyTaskId)
            .NotEmpty();
    }
}
