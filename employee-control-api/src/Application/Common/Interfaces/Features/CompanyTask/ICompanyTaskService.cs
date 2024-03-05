using EmployeeControl.Application.Common.Exceptions;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;

public interface ICompanyTaskService
{
    /// <summary>
    /// Obtener una <see cref="Domain.Entities.CompanyTask" /> por du Id.
    /// </summary>
    /// <param name="companyTaskId">Id de la <see cref="Domain.Entities.CompanyTask" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <exception cref="NotFoundException">Si no existe en la base de datos.</exception>
    /// <returns><see cref="Domain.Entities.CompanyTask" />.</returns>
    Task<Domain.Entities.CompanyTask> GetByIdAsync(string companyTaskId, CancellationToken cancellationToken);

    /// <summary>
    /// Crea una nueva <see cref="Domain.Entities.CompanyTask" />.
    /// </summary>
    /// <param name="newCompanyTask"><see cref="Domain.Entities.CompanyTask" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="Domain.Entities.CompanyTask" />Creada.</returns>
    Task<Domain.Entities.CompanyTask> CreateAsync(
        Domain.Entities.CompanyTask newCompanyTask,
        CancellationToken cancellationToken);
}
