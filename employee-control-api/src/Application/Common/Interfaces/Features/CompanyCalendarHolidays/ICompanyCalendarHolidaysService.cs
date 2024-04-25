using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;

public interface ICompanyCalendarHolidaysService
{
    /// <summary>
    /// Obtener un <see cref="CompanyCalendarHoliday" /> por su Id.
    /// </summary>
    /// <param name="id">Id del <see cref="CompanyCalendarHoliday" /> a obtener.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendarHoliday" /> creado.</returns>
    Task<CompanyCalendarHoliday> GetByIdAsync(string id, CancellationToken cancellationToken);

    /// <summary>
    /// Crea un <see cref="CompanyCalendarHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyCalendarHoliday">Datos de <see cref="CompanyCalendarHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendarHoliday" /> creado.</returns>
    Task<CompanyCalendarHoliday> CreateAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Actualiza un <see cref="CompanyCalendarHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyCalendarHoliday">Datos de <see cref="CompanyCalendarHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyCalendarHoliday" /> actualizado.</returns>
    Task<CompanyCalendarHoliday> UpdateAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Elimina un <see cref="CompanyCalendarHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyCalendarHoliday">Datos de <see cref="CompanyCalendarHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task DeleteAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken);
}
