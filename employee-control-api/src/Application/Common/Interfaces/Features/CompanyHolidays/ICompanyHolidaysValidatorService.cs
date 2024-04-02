using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;

public interface ICompanyHolidaysValidatorService
{
    /// <summary>
    /// Comprueba si la compañía ya tiene un día festivo.
    /// </summary>
    /// <param name="companyHoliday">Datos de <see cref="CompanyHoliday" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateHolidayInDateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken);
}
