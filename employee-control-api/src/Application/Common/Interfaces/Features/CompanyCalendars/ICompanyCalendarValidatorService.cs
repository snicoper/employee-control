using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;

public interface ICompanyCalendarValidatorService
{
    /// <summary>
    /// Validaciones para crear un <see cref="CompanyCalendar" />.
    /// <para>Añade errores en <see cref="IValidationFailureService" /> sin lanzarlos.</para>
    /// </summary>
    /// <param name="companyCalendar"><see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task CreateValidationAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken);

    /// <summary>
    /// Validaciones para actualizar un <see cref="CompanyCalendar" />.
    /// <para>Añade errores en <see cref="IValidationFailureService" /> sin lanzarlos.</para>
    /// </summary>
    /// <param name="companyCalendar"><see cref="CompanyCalendar" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    Task UpdateValidationAsync(CompanyCalendar companyCalendar, CancellationToken cancellationToken);
}
