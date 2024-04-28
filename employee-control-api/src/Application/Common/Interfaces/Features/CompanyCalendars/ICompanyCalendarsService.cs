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

    /// <summary>
    /// Obtener un <see cref="CompanyCalendar" /> por su Id.
    /// </summary>
    /// <param name="id">Id del <see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendar" />.</returns>
    Task<CompanyCalendar> GetByIdAsync(string id, CancellationToken cancellationToken);

    /// <summary>
    /// Crea un <see cref="CompanyCalendar" />.
    /// </summary>
    /// <param name="companyCalendar">Datos de <see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendar" /> creado.</returns>
    Task<CompanyCalendar> CreateAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken);

    /// <summary>
    /// Actualizar <see cref="CompanyCalendar" />.
    /// </summary>
    /// <param name="companyCalendar">Datos de <see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendar" /> actualizado.</returns>
    Task<CompanyCalendar> UpdateAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken);

    /// <summary>
    /// Establecer un <see cref="CompanyCalendar" /> como default.
    /// </summary>
    /// <param name="companyCalendar"><see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task SetDefaultCalendarAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken);
}
