using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.ActivateEmployee;

[Authorize(Roles = Roles.HumanResources)]
public record ActivateEmployeeCommand(string EmployeeId) : IRequest<Result>;
