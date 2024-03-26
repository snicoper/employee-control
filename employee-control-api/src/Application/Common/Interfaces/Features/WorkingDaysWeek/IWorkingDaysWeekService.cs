using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;

public interface IWorkingDaysWeekService
{
    /// <summary>
    /// Obtener un <see cref="WorkingDaysWeek" /> por el Id de la <see cref="Company" />.
    /// </summary>
    /// <param name="companyId">Id de la <see cref="Company" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <exception cref="NotFoundException">En caso de no existir.</exception>
    /// <returns><see cref="WorkingDaysWeek" /> en caso de existir.</returns>
    Task<Domain.Entities.WorkingDaysWeek> GetByCompanyIdAsync(string companyId, CancellationToken cancellationToken);

    /// <summary>
    /// Actualizar un <see cref="WorkingDaysWeek"/>.
    /// </summary>
    /// <param name="workingDaysWeek">Datos a actualizar.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken"/>.</param>
    /// <returns><see cref="WorkingDaysWeek"/> actualizado.</returns>
    Task<Domain.Entities.WorkingDaysWeek> UpdateAsync(
        Domain.Entities.WorkingDaysWeek workingDaysWeek,
        CancellationToken cancellationToken);
}
