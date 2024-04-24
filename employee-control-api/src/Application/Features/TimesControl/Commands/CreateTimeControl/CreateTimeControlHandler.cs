using AutoMapper;
using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using MediatR;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateTimeControl;

internal class CreateTimeControlHandler(
    IMapper mapper,
    ITimesControlService timesControlService,
    IValidationFailureService validationFailureService,
    IStringLocalizer<TimeControlLocalizer> localizer)
    : IRequestHandler<CreateTimeControlCommand, string>
{
    public async Task<string> Handle(CreateTimeControlCommand request, CancellationToken cancellationToken)
    {
        // Si el empleado tiene algún tiempo iniciado, el nuevo deberá ser TimeState.close.
        var timeControlOpen = await timesControlService.GetTimeStateOpenByEmployeeIdAsync(request.UserId, cancellationToken);

        if (timeControlOpen is not null && request.TimeState == TimeState.Open)
        {
            var message = localizer["El empleado ya tiene un tiempo abierto y no es posible abrir otro, debe cerrar el tiempo."];
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NotificationErrors, message);
        }

        TimeControl resultResponse;
        var timeControl = mapper.Map<TimeControl>(request);

        timeControl.Incidence = false;
        timeControl.DeviceTypeStart = request.DeviceType;

        if (request.TimeState == TimeState.Close)
        {
            timeControl.ClosedBy = ClosedBy.Staff;
            timeControl.TimeState = TimeState.Close;
            timeControl.DeviceTypeFinish = request.DeviceType;

            resultResponse = await timesControlService.CreateWithFinishAsync(timeControl, cancellationToken);
        }
        else
        {
            timeControl.Finish = timeControl.Start;
            timeControl.TimeState = TimeState.Open;

            resultResponse = await timesControlService.CreateWithOutFinishAsync(timeControl, cancellationToken);
        }

        return resultResponse.Id;
    }
}
