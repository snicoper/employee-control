using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;

public interface ICompanyHolidaysService
{
    /// <summary>
    /// Obtener un <see cref="CompanyHoliday" /> por su Id.
    /// </summary>
    /// <param name="id">Id del <see cref="CompanyHoliday" /> a obtener.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyHoliday" /> creado.</returns>
    Task<CompanyHoliday> GetByIdAsync(string id, CancellationToken cancellationToken);

    /// <summary>
    /// Crea un <see cref="CompanyHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyHoliday" /> creado.</returns>
    Task<CompanyHoliday> CreateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Actualiza un <see cref="CompanyHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyHoliday" /> actualizado.</returns>
    Task<CompanyHoliday> UpdateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Elimina un <see cref="CompanyHoliday" /> para la empresa.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task DeleteAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);
}
