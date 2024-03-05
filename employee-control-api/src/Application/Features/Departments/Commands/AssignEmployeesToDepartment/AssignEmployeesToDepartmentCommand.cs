using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.AssignEmployeesToDepartment;

[Authorize(Roles = Roles.HumanResources)]
public record AssignEmployeesToDepartmentCommand(string Id, List<string> EmployeeIds) : IRequest<Result>;
