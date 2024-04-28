using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyCalendars;

public class CompanyCalendarValidatorService(
    IValidationFailureService validationFailureService,
    ILogger<CompanyCalendarValidatorService> logger,
    IStringLocalizer<CalendarLocalizer> localizer,
    IApplicationDbContext context)
    : ICompanyCalendarValidatorService
{
    public async Task CreateValidationAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken)
    {
        var calendar = await context
            .CompanyCalendars
            .AnyAsync(
                cc => string.Equals(cc.Name.ToLower(), companyCalendar.Name.ToLower()),
                cancellationToken);

        if (!calendar)
        {
            return;
        }

        var message = localizer["El nombre del calendario ya existe."];
        logger.LogDebug("{message}", message);
        validationFailureService.Add(nameof(CompanyCalendar.Name), message);
    }

    public async Task UpdateValidationAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken)
    {
        var calendar = await context
            .CompanyCalendars
            .AnyAsync(
                cc => cc.Id != companyCalendar.Id && string.Equals(cc.Name.ToLower(), companyCalendar.Name.ToLower()),
                cancellationToken);

        if (!calendar)
        {
            return;
        }

        var message = localizer["El nombre del calendario ya existe."];
        logger.LogDebug("{message}", message);
        validationFailureService.Add(nameof(CompanyCalendar.Name), message);
    }
}
