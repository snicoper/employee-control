using AutoMapper;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Application.Features.IdentityRoles.Queries.GetAllIdentityRoles;

internal class GetAllIdentityRolesHandler(RoleManager<ApplicationRole> roleManager, IMapper mapper)
    : IRequestHandler<GetAllIdentityRolesQuery, ICollection<GetAllIdentityRolesResponse>>
{
    public Task<ICollection<GetAllIdentityRolesResponse>> Handle(
        GetAllIdentityRolesQuery request,
        CancellationToken cancellationToken)
    {
        var roles = roleManager
            .Roles
            .ToList();

        var result = mapper.Map<List<ApplicationRole>, ICollection<GetAllIdentityRolesResponse>>(roles);

        return Task.FromResult(result);
    }
}
