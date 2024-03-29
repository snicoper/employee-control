using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompaniesSettings;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Services.Features.TimesControl;

public class TimesControlService(
    IDateTimeService dateTimeService,
    ITimesControlValidatorService timesControlValidatorService,
    IValidationFailureService validationFailureService,
    IApplicationDbContext context,
    ICompanySettingsService companySettingsService,
    IStringLocalizer<TimeControlLocalizer> localizer,
    ILogger<TimesControlService> logger)
    : ITimesControlService
{
    public async Task<TimeControl> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var result = await context
                         .TimeControls
                         .SingleOrDefaultAsync(tc => tc.Id.Equals(id), cancellationToken) ??
                     throw new NotFoundException(nameof(TimeControl), nameof(TimeControl.Id));

        return result;
    }

    public async Task<TimeControl> GetWithEmployeeInfoByIdAsync(string id, CancellationToken cancellationToken)
    {
        var result = await context
                         .TimeControls
                         .Include(tc => tc.User)
                         .SingleOrDefaultAsync(tc => tc.Id.Equals(id), cancellationToken) ??
                     throw new NotFoundException(nameof(TimeControl), nameof(TimeControl.Id));

        return result;
    }

    public async Task<IEnumerable<IGrouping<int, TimeControl>>> GetRangeByEmployeeIdAsync(
        string employeeId,
        DateTimeOffset from,
        DateTimeOffset to,
        CancellationToken cancellationToken)
    {
        var timeControlGroups = await context
            .TimeControls
            .Where(tc => tc.UserId == employeeId && tc.Start >= from && tc.Finish <= to)
            .GroupBy(tc => tc.Start.Day)
            .ToListAsync(cancellationToken);

        // Seleccionar el primer item para comprobar permisos de lectura.
        var firstTimeControl = timeControlGroups.FirstOrDefault()?.FirstOrDefault();

        return firstTimeControl is null ? new List<IGrouping<int, TimeControl>>() : timeControlGroups;
    }

    public IQueryable<TimeControl> GetWithUser()
    {
        var timesControl = context
            .TimeControls
            .Include(tc => tc.User);

        return timesControl;
    }

    public IQueryable<TimeControl> GetWithUserByEmployeeId(string employeeId)
    {
        var timesControl = context
            .TimeControls
            .Include(tc => tc.User)
            .Where(tc => tc.UserId == employeeId);

        return timesControl;
    }

    public async Task<TimeState> GetTimeStateByEmployeeAsync(ApplicationUser user, CancellationToken cancellationToken)
    {
        var timeControl = await context
            .TimeControls
            .SingleOrDefaultAsync(ct => ct.TimeState == TimeState.Open && ct.UserId == user.Id, cancellationToken);

        if (timeControl is null)
        {
            return TimeState.Close;
        }

        // Si el tiempo ha superado las 23:59:59 respecto al día que se inicializó el sistema lo cierra y lo reporta como alerta.
        // El tiempo es en base al timezone de la compañía.
        var datetimeZone = await companySettingsService.ConvertToTimezoneCurrentCompanyAsync(
            dateTimeService.EndOfDay(dateTimeService.UtcNow),
            cancellationToken);

        if (timeControl.Start.Day != datetimeZone.Day)
        {
            await FinishAsync(user, DeviceType.System, ClosedBy.System, null, null, cancellationToken);
        }

        return timeControl.TimeState;
    }

    public async Task<TimeControl> CreateWithOutFinishAsync(TimeControl timeControl, CancellationToken cancellationToken)
    {
        await timesControlValidatorService.ValidateCreateAsync(timeControl, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        await context.TimeControls.AddAsync(timeControl, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return timeControl;
    }

    public async Task<TimeControl> CreateWithFinishAsync(TimeControl timeControl, CancellationToken cancellationToken)
    {
        await timesControlValidatorService.ValidateUpdateAsync(timeControl, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        await context.TimeControls.AddAsync(timeControl, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return timeControl;
    }

    public async Task<(Result Result, TimeControl TimeControl)> StartAsync(
        ApplicationUser user,
        DeviceType deviceType,
        double? latitude,
        double? longitude,
        CancellationToken cancellationToken)
    {
        var timeControl = new TimeControl
        {
            UserId = user.Id,
            Start = dateTimeService.UtcNow,
            Finish = dateTimeService.UtcNow,
            CompanyId = user.CompanyId,
            DeviceTypeStart = deviceType,
            LatitudeStart = latitude,
            LongitudeStart = longitude
        };

        // Validaciones.
        await timesControlValidatorService.ValidateCreateAsync(timeControl, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        await context.TimeControls.AddAsync(timeControl, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return (Result.Success(), timeControl);
    }

    public async Task<(Result Result, TimeControl? TimeControl)> FinishAsync(
        ApplicationUser user,
        DeviceType deviceType,
        ClosedBy closedBy,
        double? latitude,
        double? longitude,
        CancellationToken cancellationToken)
    {
        var timeControl = await context
            .TimeControls
            .SingleOrDefaultAsync(tc => tc.TimeState == TimeState.Open && tc.UserId == user.Id, cancellationToken);

        if (timeControl?.ClosedBy is null)
        {
            var message = localizer["No hay un tiempo inicializado."];
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NotificationErrors, message);

            return (Result.Failure(message), timeControl);
        }

        // Si es cerrado por el sistema, de momento solo hay un motivo que es tiempo superado 23:59:00.
        timeControl.Finish = closedBy == ClosedBy.System
            ? dateTimeService.EndOfDay(timeControl.Finish)
            : dateTimeService.UtcNow;

        timeControl.ClosedBy = closedBy;
        timeControl.TimeState = TimeState.Close;
        timeControl.DeviceTypeFinish = deviceType;
        timeControl.LatitudeFinish = latitude;
        timeControl.LongitudeFinish = longitude;

        await UpdateAsync(timeControl, cancellationToken);

        return (Result.Success(), timeControl);
    }

    public async Task<TimeControl> UpdateAsync(TimeControl timeControl, CancellationToken cancellationToken)
    {
        await timesControlValidatorService.ValidateUpdateAsync(timeControl, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.TimeControls.Update(timeControl);
        await context.SaveChangesAsync(cancellationToken);

        return timeControl;
    }

    public Task CloseTimeControlJobAsync()
    {
        logger.LogInformation($"Ejecutando servicio {nameof(CloseTimeControlJobAsync)}");

        return Task.CompletedTask;
    }
}
