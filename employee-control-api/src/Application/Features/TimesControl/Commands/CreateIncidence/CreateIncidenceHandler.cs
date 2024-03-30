using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Services.Hubs;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateIncidence;

internal class CreateIncidenceHandler(
    ITimesControlService timesControlService,
    IHubContext<NotificationTimeControlIncidenceHub> hubContext)
    : IRequestHandler<CreateIncidenceCommand, Result>
{
    public async Task<Result> Handle(CreateIncidenceCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.TimeControlId, cancellationToken);
        timeControl.Incidence = true;
        timeControl.IncidenceDescription = request.IncidenceDescription;
        await timesControlService.UpdateAsync(timeControl, cancellationToken);

        // Notificar a SignalR de nueva incidencia.
        await hubContext.Clients.All.SendAsync(HubNames.TimeControlIncidences, cancellationToken);

        return Result.Success();
    }
}
