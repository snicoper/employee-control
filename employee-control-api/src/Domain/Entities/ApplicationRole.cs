using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Roles de empleados.
/// </summary>
public class ApplicationRole : IdentityRole
{
    public ApplicationRole()
    {
    }

    public ApplicationRole(string roleName)
        : base(roleName)
    {
    }
}
