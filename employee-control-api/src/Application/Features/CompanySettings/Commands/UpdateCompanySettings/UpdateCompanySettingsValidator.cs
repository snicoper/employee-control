﻿using FluentValidation;

namespace EmployeeControl.Application.Features.CompanySettings.Commands.UpdateCompanySettings;

public class UpdateCompanySettingsValidator : AbstractValidator<UpdateCompanySettingsCommand>
{
    public UpdateCompanySettingsValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();

        RuleFor(r => r.Timezone)
            .NotEmpty();

        RuleFor(r => r.PeriodTimeControlMax)
            .NotEmpty();

        RuleFor(r => r.WeeklyWorkingHours)
            .NotEmpty();
    }
}
