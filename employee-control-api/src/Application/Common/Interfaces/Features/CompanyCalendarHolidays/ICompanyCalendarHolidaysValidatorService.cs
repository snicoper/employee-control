using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;

public interface ICompanyCalendarHolidaysValidatorService
{
    /// <summary>
    /// Comprueba si la compañía ya tiene un día festivo.
    /// </summary>
    /// <param name="companyCalendarHoliday">Datos de <see cref="CompanyCalendarHoliday" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateCreateHolidayInDateAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken);

    /// <summary>
    /// Comprueba si la compañía ya tiene un día festivo.
    /// </summary>
    /// <param name="companyCalendarHoliday">Datos de <see cref="CompanyCalendarHoliday" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task ValidateUpdateHolidayInDateAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken);
}
