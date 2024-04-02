using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;

public interface ICompanyHolidaysService
{
    /// <summary>
    /// Crea un nuevo día festivo para la empresa.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" /> a crear.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="CompanyHoliday" /> creado.</returns>
    Task<CompanyHoliday> CreateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);
}
