using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetRolesByEmployeeId;

internal class GetRolesByEmployeeIdHandler(
    IIdentityService identityService,
    IIdentityRoleService identityRoleService,
    IMapper mapper)
    : IRequestHandler<GetRolesByEmployeeIdQuery, ICollection<GetRolesByEmployeeIdResponse>>
{
    public async Task<ICollection<GetRolesByEmployeeIdResponse>> Handle(
        GetRolesByEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var user = await identityService.GetByIdAsync(request.EmployeeId);
        var identityRoles = await identityRoleService.GetRolesByUseAsync(user);
        var result = mapper.Map<List<ApplicationRole>, ICollection<GetRolesByEmployeeIdResponse>>(identityRoles);

        return result;
    }
}
