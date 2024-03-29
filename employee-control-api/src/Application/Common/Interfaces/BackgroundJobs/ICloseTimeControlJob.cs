using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.BackgroundJobs;

public interface ICloseTimeControlJob
{
    /// <summary>
    /// Cierra <see cref="TimeControl" /> que superen el tiempo abierto establecido
    /// por la configuración de la compañía.
    /// </summary>
    Task Process();
}
