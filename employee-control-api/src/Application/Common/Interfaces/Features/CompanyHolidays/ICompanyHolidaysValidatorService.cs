using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;

public interface ICompanyHolidaysValidatorService
{
    /// <summary>
    /// Comprueba si la compañía ya tiene un día festivo.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateCreateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Comprueba si la compañía ya tiene un día festivo.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateUpdateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);
}
