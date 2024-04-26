using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;

public interface ICompanyCalendarsService
{
    /// <summary>
    /// Obtener lista de <see cref="CompanyCalendar" />.
    /// </summary>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns>Lista de <see cref="CompanyCalendar" />.</returns>
    Task<ICollection<CompanyCalendar>> GetAllAsync(CancellationToken cancellationToken);
}
