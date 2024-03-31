using EmployeeControl.Application.Common.Constants;
using Microsoft.AspNetCore.SignalR;

namespace EmployeeControl.Application.Common.Services.Hubs;

public class NotificationTimeControlIncidenceHub : Hub
{
    /// <summary>
    /// Notifica que se ha añadido o eliminado una incidencia.
    /// </summary>
    public async Task Notify()
    {
        await Clients.All.SendAsync(HubNames.TimeControlIncidences);
    }
}
