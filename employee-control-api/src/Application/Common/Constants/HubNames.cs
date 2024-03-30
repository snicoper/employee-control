using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Constants;

public static class HubNames
{
    /// <summary>
    /// Notificaciones cambios de incidencias de <see cref="TimeControl" />.
    /// </summary>
    public static readonly string TimeControlIncidences = nameof(TimeControlIncidences);
}
