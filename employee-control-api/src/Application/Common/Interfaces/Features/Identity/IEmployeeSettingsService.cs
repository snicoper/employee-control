using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.Identity;

public interface IEmployeeSettingsService
{
    /// <summary>
    /// Obtener <see cref="EmployeeSettings" /> por el Id de usuario.
    /// </summary>
    /// <param name="employeeId">Id empleado.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="EmployeeSettings" /> del usuario.</returns>
    Task<EmployeeSettings> GetByEmployeeIdAsync(string employeeId, CancellationToken cancellationToken);

    /// <summary>
    /// Crea configuración de un usuario.
    /// </summary>
    /// <param name="employeeSettings"><see cref="EmployeeSettings" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task<int> CreateAsync(EmployeeSettings employeeSettings, CancellationToken cancellationToken);

    /// <summary>
    /// Actualizar un <see cref="EmployeeSettings" />.
    /// </summary>
    /// <param name="employeeSettings"><see cref="EmployeeSettings" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns>El item actualizado de <see cref="EmployeeSettings" />.</returns>
    Task<EmployeeSettings> UpdateAsync(EmployeeSettings employeeSettings, CancellationToken cancellationToken);
}
