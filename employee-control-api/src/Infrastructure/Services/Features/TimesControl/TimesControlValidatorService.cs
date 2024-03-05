using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure.Services.Features.TimesControl;

public class TimesControlValidatorService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    IStringLocalizer<TimesControlService> localizer,
    IDateTimeService dateTimeService)
    : ITimesControlValidatorService
{
    public async Task ValidateCreateAsync(TimeControl timeControl, CancellationToken cancellationToken)
    {
        // El Finish no puede ser menor al Start.
        if (timeControl.Finish < timeControl.Start)
        {
            validationFailureService.Add(
                ValidationErrorsKeys.NotificationErrors,
                localizer["El tiempo final no puede ser antes que el tiempo de inicio."]);

            return;
        }

        // Comprueba si existe algún tiempo cerrado en el rango del tiempo a crear.
        var checkTime = await context
            .TimeControls
            .AnyAsync(
                tc => tc.UserId == timeControl.UserId &&
                      tc.TimeState == TimeState.Close &&
                      timeControl.Start >= tc.Start &&
                      timeControl.Start <= tc.Finish,
                cancellationToken);

        if (checkTime)
        {
            validationFailureService.Add(
                ValidationErrorsKeys.NotificationErrors,
                localizer["El tiempo coincide con algún tiempo creado y no es posible iniciar el tiempo."]);

            return;
        }

        // Comprueba si hay algún tiempo abierto que coincide con el rango de tiempo a crear.
        checkTime = await context
            .TimeControls
            .AnyAsync(
                tc => tc.UserId == timeControl.UserId && tc.TimeState == TimeState.Open &&
                      timeControl.Start >= tc.Start && timeControl.Start <= dateTimeService.UtcNow,
                cancellationToken);

        if (!checkTime)
        {
            return;
        }

        validationFailureService.Add(
            ValidationErrorsKeys.NotificationErrors,
            localizer["El tiempo coincide con algún tiempo abierto y no es posible iniciar el tiempo."]);
    }

    public async Task ValidateUpdateAsync(TimeControl timeControl, CancellationToken cancellationToken)
    {
        // Los tiempos iniciados, no se pueden editar.
        if (timeControl.TimeState == TimeState.Open)
        {
            validationFailureService.Add(
                ValidationErrorsKeys.NotificationErrors,
                localizer["El tiempo esta actualmente iniciado."]);

            return;
        }

        // El Finish no puede ser menor al Start.
        if (timeControl.Finish < timeControl.Start)
        {
            validationFailureService.Add(
                ValidationErrorsKeys.NotificationErrors,
                localizer["El tiempo final no puede ser antes que el tiempo de inicio."]);

            return;
        }

        // Comprueba si existe algún tiempo en el rango del tiempo a actualizar.
        var checkTime = await context
            .TimeControls
            .AnyAsync(
                tc =>
                    tc.Id != timeControl.Id &&
                    tc.UserId == timeControl.UserId &&
                    tc.TimeState == TimeState.Close &&
                    ((timeControl.Start >= tc.Start && timeControl.Start <= tc.Finish) ||
                     (timeControl.Finish >= tc.Start && timeControl.Finish <= tc.Finish)),
                cancellationToken);

        if (checkTime)
        {
            validationFailureService.Add(
                ValidationErrorsKeys.NotificationErrors,
                localizer["El tiempo coincide con algún tiempo creado y no es posible actualizar el tiempo."]);

            return;
        }

        // Comprueba si hay algún tiempo abierto que coincide con el rango de tiempo a actualizar.
        checkTime = await context
            .TimeControls
            .AnyAsync(
                tc => tc.UserId == timeControl.UserId && tc.Id != timeControl.Id && tc.TimeState == TimeState.Open &&
                      ((timeControl.Start >= tc.Start && timeControl.Start <= dateTimeService.UtcNow) ||
                       (timeControl.Finish >= tc.Start && timeControl.Finish <= dateTimeService.UtcNow)),
                cancellationToken);

        if (!checkTime)
        {
            return;
        }

        validationFailureService.Add(
            ValidationErrorsKeys.NotificationErrors,
            localizer["El tiempo coincide con algún tiempo abierto y no es posible actualizar el tiempo."]);
    }
}
