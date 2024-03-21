using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.WorkDays;

public interface IWorkDaysService
{
    /// <summary>
    /// Obtener un <see cref="Domain.Entities.WorkDays" /> por el Id de la <see cref="Company" />.
    /// </summary>
    /// <param name="companyId">Id de la <see cref="Company" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <exception cref="NotFoundException">En caso de no existir.</exception>
    /// <returns><see cref="Domain.Entities.WorkDays" /> en caso de existir.</returns>
    Task<Domain.Entities.WorkDays> GetByCompanyIdAsync(string companyId, CancellationToken cancellationToken);

    /// <summary>
    /// Actualizar un <see cref="Domain.Entities.WorkDays"/>.
    /// </summary>
    /// <param name="workDays">Datos a actualizar.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
    /// <returns><see cref="Domain.Entities.WorkDays"/> actualizado.</returns>
    Task<Domain.Entities.WorkDays> UpdateAsync(Domain.Entities.WorkDays workDays, CancellationToken cancellationToken);
}
