using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.DeactivateEmployee;

[Authorize(Roles = Roles.HumanResources)]
public record DeactivateEmployeeCommand(string EmployeeId) : IRequest<Result>;
