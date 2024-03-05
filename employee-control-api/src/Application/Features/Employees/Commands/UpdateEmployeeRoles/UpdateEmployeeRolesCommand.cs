using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployeeRoles;

[Authorize(Roles = Roles.Employee)]
public record UpdateEmployeeRolesCommand(string EmployeeId, List<string> RolesToAdd) : IRequest<Result>;
