using EmployeeControl.Application.Common.Exceptions;

namespace EmployeeControl.Application.Common.Interfaces.Features.Companies;

public interface ICompanyService
{
    /// <summary>
    /// Obtener una <see cref="Domain.Entities.Company" /> por su Id.
    /// </summary>
    /// <param name="companyId">Id compañía.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <exception cref="NotFoundException">Si no encuentra la <see cref="Domain.Entities.Company" />.</exception>
    /// <returns><see cref="Domain.Entities.Company" />.</returns>
    Task<Domain.Entities.Company> GetByIdAsync(string companyId, CancellationToken cancellationToken);

    /// <summary>
    /// Crea una compañía.
    /// </summary>
    /// <param name="company">Datos de la compañía.</param>
    /// <param name="timezone">Timezone de la compañía.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns>La entidad <see cref="Domain.Entities.Company" /> creada.</returns>
    Task<Domain.Entities.Company> CreateAsync(
        Domain.Entities.Company company,
        string timezone,
        CancellationToken cancellationToken);
}
