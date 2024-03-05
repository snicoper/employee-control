using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetRolesByEmployeeId;

[Authorize(Roles = Roles.HumanResources)]
public record GetRolesByEmployeeIdQuery(string EmployeeId) : IRequest<ICollection<GetRolesByEmployeeIdResponse>>;
