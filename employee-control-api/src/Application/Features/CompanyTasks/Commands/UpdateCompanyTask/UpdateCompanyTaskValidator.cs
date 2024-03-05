using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.UpdateCompanyTask;

public class UpdateCompanyTaskValidator : AbstractValidator<UpdateCompanyTaskCommand>
{
    public UpdateCompanyTaskValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Name)
            .NotEmpty()
            .MaximumLength(256);
    }
}
