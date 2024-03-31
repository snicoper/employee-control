using EmployeeControl.Application;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure;

public class CompanyHolidaysValidatorService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    IStringLocalizer<CompanyHolidayLocalizer> localizer)
    : ICompanyHolidaysValidatorService
{
    public async Task ValidateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        var dateExists = await context
            .CompanyHolidays
            .AnyAsync(ch => ch.Day == companyHoliday.Day && ch.CompanyId == companyHoliday.CompanyId, cancellationToken);

        if (!dateExists)
        {
            return;
        }

        var message = localizer["La fecha seleccionada ya tiene asignado un día festivo."];
        validationFailureService.Add(nameof(CompanyHoliday.Day), message);
    }
}
