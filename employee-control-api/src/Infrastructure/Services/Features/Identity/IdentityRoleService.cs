using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Infrastructure.Services.Features.Identity;

public class IdentityRoleService(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager)
    : IIdentityRoleService
{
    public async Task<List<ApplicationRole>> GetRolesByUseAsync(ApplicationUser user)
    {
        var identityRoles = new List<ApplicationRole>();
        var userRoles = await userManager.GetRolesAsync(user);

        if (userRoles.Count == 0)
        {
            return identityRoles;
        }

        foreach (var role in roleManager.Roles.Where(r => r.Name != null && userRoles.Contains(r.Name)))
        {
            identityRoles.Add(role);
        }

        return identityRoles;
    }
}
