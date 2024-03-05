using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployeeRoles;

internal class UpdateEmployeeRolesHandler(
    IIdentityService identityService,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<UpdateEmployeeRolesCommand, Result>
{
    public async Task<Result> Handle(UpdateEmployeeRolesCommand request, CancellationToken cancellationToken)
    {
        var user = await identityService.GetByIdAsync(request.EmployeeId);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(user);

        var resultResponse = await identityService.UpdateRolesByUserIdAsync(user, request.RolesToAdd, cancellationToken);

        return resultResponse;
    }
}
