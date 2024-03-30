using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Services.Hubs;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.UpdateTimeControl;

internal class UpdateTimeControlHandler(
    ITimesControlService timesControlService,
    IHubContext<NotificationTimeControlIncidenceHub> hubContext)
    : IRequestHandler<UpdateTimeControlCommand, Result>
{
    public async Task<Result> Handle(UpdateTimeControlCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.Id, cancellationToken);

        timeControl.Start = request.Start;
        timeControl.Finish = request.Finish;

        if (request.CloseIncidence)
        {
            timeControl.Incidence = false;
        }

        await timesControlService.UpdateAsync(timeControl, cancellationToken);

        if (request.CloseIncidence)
        {
            // Notificar SignalR de cierre de una incidencia.
            await hubContext.Clients.All.SendAsync(HubNames.TimeControlIncidences, cancellationToken);
        }

        return Result.Success();
    }
}
