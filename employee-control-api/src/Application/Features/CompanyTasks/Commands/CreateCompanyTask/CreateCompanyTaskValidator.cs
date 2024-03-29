using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.CreateCompanyTask;

public class CreateCompanyTaskValidator : AbstractValidator<CreateCompanyTaskCommand>
{
    public CreateCompanyTaskValidator()
    {
        RuleFor(r => r.Name)
            .NotEmpty()
            .MaximumLength(256);

        RuleFor(r => r.Background)
            .NotEmpty()
            .Length(7);

        RuleFor(r => r.Color)
            .NotEmpty()
            .Length(7);
    }
}
