using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Application.Common.Security;

public interface IPermissionsValidationService
{
    /// <summary>
    /// Comprueba si <see cref="ICompany.CompanyId" /> es igual a <see cref="ICurrentUserService" />.
    /// <para>
    /// Si el <see cref="Roles" /> es al menos <see cref="Roles.SiteStaff" />,
    /// se considera que si tiene permisos. De lo contrario, solo podrá leer los datos en caso de que el
    /// <see cref="ICurrentUserService.CompanyId" /> sea igual a TEntity.CompanyId.
    /// </para>
    /// </summary>
    /// <param name="entity">Entidad a comprobar.</param>
    /// <typeparam name="TEntity">Entidad.</typeparam>
    /// <exception cref="NotFoundException">Si no tiene permisos para leer los datos.</exception>
    Task CheckEntityCompanyIsOwnerAsync<TEntity>(TEntity entity)
        where TEntity : ICompany;

    /// <summary>
    /// Comprueba si <see cref="ICompany.CompanyId" /> es igual a <see cref="ICurrentUserService" />.
    /// <para>
    /// Si el <see cref="Roles" /> es al menos <see cref="Roles.SiteStaff" />,
    /// se considera que si tiene permisos. De lo contrario, solo podrá leer los datos en caso de que el
    /// <see cref="ICurrentUserService.CompanyId" /> sea igual a TEntity.CompanyId y tenga un
    /// <see cref="Roles" /> requiredRole.
    /// </para>
    /// <para>
    /// Con requiredRole no asignar nunca roles de usuario, es solo para
    /// administración del sitio.
    /// </para>
    /// </summary>
    /// <param name="entity">Entidad a comprobar.</param>
    /// <param name="requiredRole">Role mínimo requerido para leer los datos.</param>
    /// <typeparam name="TEntity">Entidad.</typeparam>
    /// <exception cref="NotFoundException">Si no tiene permisos para leer los datos.</exception>
    Task CheckEntityCompanyIsOwnerAsync<TEntity>(TEntity entity, string requiredRole)
        where TEntity : ICompany;

    /// <summary>
    /// Comprueba si un usuario pertenece a una compañía por la Id de la compañía.
    /// <para>Similar a <see cref="CheckEntityCompanyIsOwnerAsync{TEntity}(TEntity)"/>, pero no requiere de Entidad.</para>
    /// </summary>
    /// <param name="companyId">Id compañía.</param>
    /// <returns>True si pertenece, false en caso contrario.</returns>
    bool ItsFromTheCompany(string companyId);
}
