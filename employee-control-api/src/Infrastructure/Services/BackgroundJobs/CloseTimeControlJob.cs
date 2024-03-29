using EmployeeControl.Application.Common.Interfaces.BackgroundJobs;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompaniesSettings;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Enums;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Services.BackgroundJobs;

public class CloseTimeControlJob(
    ICompanySettingsService companySettingsService,
    IApplicationDbContext context,
    IStringLocalizer<TimeControlLocalizer> localizer,
    IDateTimeService dateTimeService,
    ILogger<CloseTimeControlJob> logger)
    : ICloseTimeControlJob
{
    public async Task Process()
    {
        logger.LogInformation($"Procesando ${nameof(CloseTimeControlJob)}.");
        var companySettings = await companySettingsService.GetCompanySettingsAsync(CancellationToken.None);
        var maxDuration = companySettings.MaximumDailyWorkHours;

        var timesControl = context
            .TimeControls
            .Where(tc => tc.TimeState == TimeState.Open && (dateTimeService.UtcNow - tc.Start).Hours >= maxDuration)
            .ToList();

        foreach (var timeControl in timesControl)
        {
            timeControl.Finish = timeControl.Start.AddHours(maxDuration);
            timeControl.ClosedBy = ClosedBy.System;
            timeControl.TimeState = TimeState.Close;
            timeControl.DeviceTypeFinish = DeviceType.System;
            timeControl.Incidence = true;
            timeControl.IncidenceDescription = localizer["Tiempo cerrado por el sistema por exceder el tiempo abierto."];
        }

        context.TimeControls.UpdateRange(timesControl);
        await context.SaveChangesAsync(CancellationToken.None);

        logger.LogInformation($"Procesado ${nameof(CloseTimeControlJob)} con éxito.");
    }
}
