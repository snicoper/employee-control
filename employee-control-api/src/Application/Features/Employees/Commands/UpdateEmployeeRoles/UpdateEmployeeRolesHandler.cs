using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployeeRoles;

internal class UpdateEmployeeRolesHandler(IIdentityService identityService)
    : IRequestHandler<UpdateEmployeeRolesCommand, Result>
{
    public async Task<Result> Handle(UpdateEmployeeRolesCommand request, CancellationToken cancellationToken)
    {
        var user = await identityService.GetByIdAsync(request.EmployeeId);
        var resultResponse = await identityService.UpdateRolesByUserIdAsync(user, request.RolesToAdd, cancellationToken);

        return resultResponse;
    }
}
