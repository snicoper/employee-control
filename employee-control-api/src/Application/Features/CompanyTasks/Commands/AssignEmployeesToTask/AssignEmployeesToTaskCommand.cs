using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.AssignEmployeesToTask;

[Authorize(Roles = Roles.HumanResources)]
public record AssignEmployeesToTaskCommand(string Id, List<string> EmployeeIds) : IRequest<Result>;
