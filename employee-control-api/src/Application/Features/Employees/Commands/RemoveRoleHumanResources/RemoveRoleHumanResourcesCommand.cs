using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.RemoveRoleHumanResources;

[Authorize(Roles = Roles.EnterpriseAdmin)]
public record RemoveRoleHumanResourcesCommand(string EmployeeId) : IRequest<Result>;
