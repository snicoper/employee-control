using FluentValidation;

namespace EmployeeControl.Application.Features.Employees.Commands.AddRoleHumanResources;

public class AddRoleHumanResourcesValidator : AbstractValidator<AddRoleHumanResourcesCommand>
{
    public AddRoleHumanResourcesValidator()
    {
        RuleFor(r => r.EmployeeId)
            .NotEmpty();
    }
}
