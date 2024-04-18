using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.AddRoleHumanResources;

[Authorize(Roles = Roles.Admin)]
public record AddRoleHumanResourcesCommand(string EmployeeId) : IRequest<Result>;
