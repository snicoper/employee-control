using FluentValidation;

namespace EmployeeControl.Application.Features.WorkDays.Commands.UpdateWorkDays;

public class UpdateWorkDaysValidator : AbstractValidator<UpdateWorkDaysCommand>
{
    public UpdateWorkDaysValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
