using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyCalendarHolidays;

public class CompanyCalendarHolidaysValidatorService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    IStringLocalizer<CalendarLocalizer> localizer)
    : ICompanyCalendarHolidaysValidatorService
{
    public async Task ValidateCreateHolidayInDateAsync(
        CompanyCalendarHoliday companyCalendarHoliday,
        CancellationToken cancellationToken)
    {
        var dateExists = await context
            .CompanyCalendarHoliday
            .AnyAsync(ch => ch.Date == companyCalendarHoliday.Date, cancellationToken);

        if (!dateExists)
        {
            return;
        }

        var message = localizer["La fecha seleccionada ya tiene asignado un día festivo."];
        validationFailureService.Add(nameof(CompanyCalendarHoliday.Date), message);
    }

    public async Task ValidateUpdateHolidayInDateAsync(
        CompanyCalendarHoliday companyCalendarHoliday,
        CancellationToken cancellationToken)
    {
        var dateExists = await context
            .CompanyCalendarHoliday
            .AnyAsync(ch => ch.Id != companyCalendarHoliday.Id && ch.Date == companyCalendarHoliday.Date, cancellationToken);

        if (!dateExists)
        {
            return;
        }

        var message = localizer["La fecha seleccionada ya tiene asignado un día festivo."];
        validationFailureService.Add(nameof(CompanyCalendarHoliday.Date), message);
    }
}
