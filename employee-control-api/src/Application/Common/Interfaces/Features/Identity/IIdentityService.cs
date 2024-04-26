using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.Identity;

public interface IIdentityService
{
    /// <summary>
    /// Obtener el nombre de un usuario por su Id.
    /// </summary>
    /// <param name="userId">Id usuario.</param>
    /// <returns>Nombre del usuario.</returns>
    Task<string?> GetUserNameAsync(string userId);

    /// <summary>
    /// Obtener usuario por su Id.
    /// </summary>
    /// <param name="userId">Id del usuario.</param>
    /// <returns><see cref="ApplicationUser" />.</returns>
    Task<ApplicationUser> GetByIdAsync(string userId);

    /// <summary>
    /// Obtener usuario actual.
    /// </summary>
    /// <returns><see cref="ApplicationUser" />.</returns>
    Task<ApplicationUser> GetCurrentAsync();

    /// <summary>
    /// Obtener un usuario por su Email.
    /// </summary>
    /// <param name="email">Email del usuaio.</param>
    /// <returns><see cref="ApplicationUser" />.</returns>
    Task<ApplicationUser> GetByEmailAsync(string email);

    /// <summary>
    /// Comprueba si un <see cref="ApplicationUser" /> tiene un role asignado.
    /// </summary>
    /// <param name="userId">Id de usuario.</param>
    /// <param name="role">Role a verificar.</param>
    /// <returns>True si tiene el role asignado, false en caso contrario.</returns>
    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    /// <summary>
    /// Obtener un <see cref="IQueryable" /> de <see cref="ApplicationUser" />.
    /// </summary>
    /// <returns><see cref="IQueryable" /> de <see cref="ApplicationUser" />.</returns>
    IQueryable<ApplicationUser> GetAllQueryable();

    /// <summary>
    /// Crear un usuario.
    /// <para>Hace las validaciones necesarias para ver si puede ser creado.</para>
    /// </summary>
    /// <param name="user"><see cref="ApplicationUser" />.</param>
    /// <param name="password">Contraseña del usuario.</param>
    /// <param name="roles">Roles a asignar al usuario.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="Result" /> y el Id del usuario en caso de éxito.</returns>
    Task<(Result Result, string Id)> CreateAsync(
        ApplicationUser user,
        string password,
        IEnumerable<string> roles,
        CancellationToken cancellationToken);

    /// <summary>
    /// Actualizar un usuario.
    /// <para>Hace las validaciones necesarias para ver si puede ser actualizado.</para>
    /// </summary>
    /// <param name="user"><see cref="ApplicationUser" />.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="Result" />.</returns>
    Task<Result> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken);

    /// <summary>
    /// Elimina de la base de datos un usuario.
    /// </summary>
    /// <param name="user"><see cref="ApplicationUser" />.</param>
    /// <returns><see cref="Result" />.</returns>
    Task<Result> DeleteAsync(ApplicationUser user);

    /// <summary>
    /// Modifica los roles de un usuario.
    /// <para>Elimina todos los roles que tenga actualmente y añade solo los que obtiene.</para>
    /// </summary>
    /// <param name="user"><see cref="ApplicationUser" />.</param>
    /// <param name="rolesToAdd">Roles a añadir.</param>
    /// <param name="cancellationToken"><see cref="CancellationToken" />.</param>
    /// <returns><see cref="Result" />.</returns>
    Task<Result> UpdateRolesByUserIdAsync(
        ApplicationUser user,
        List<string> rolesToAdd,
        CancellationToken cancellationToken);
}
