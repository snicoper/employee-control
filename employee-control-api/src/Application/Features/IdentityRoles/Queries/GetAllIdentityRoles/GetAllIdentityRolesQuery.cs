using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.IdentityRoles.Queries.GetAllIdentityRoles;

[Authorize(Roles = Roles.HumanResources)]
public record GetAllIdentityRolesQuery : IRequest<ICollection<GetAllIdentityRolesResponse>>;
