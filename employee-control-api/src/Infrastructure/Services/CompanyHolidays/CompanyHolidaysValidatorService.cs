using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure.Services.CompanyHolidays;

public class CompanyHolidaysValidatorService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    IStringLocalizer<CompanyHolidayLocalizer> localizer)
    : ICompanyHolidaysValidatorService
{
    public async Task ValidateCreateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        var dateExists = await context
            .CompanyHolidays
            .AnyAsync(ch => ch.Date == companyHoliday.Date && ch.CompanyId == companyHoliday.CompanyId, cancellationToken);

        if (!dateExists)
        {
            return;
        }

        var message = localizer["La fecha seleccionada ya tiene asignado un día festivo."];
        validationFailureService.Add(nameof(CompanyHoliday.Date), message);
    }

    public async Task ValidateUpdateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        var dateExists = await context
            .CompanyHolidays
            .AnyAsync(
                ch => ch.Id != companyHoliday.Id && ch.Date == companyHoliday.Date && ch.CompanyId == companyHoliday.CompanyId,
                cancellationToken);

        if (!dateExists)
        {
            return;
        }

        var message = localizer["La fecha seleccionada ya tiene asignado un día festivo."];
        validationFailureService.Add(nameof(CompanyHoliday.Date), message);
    }
}
