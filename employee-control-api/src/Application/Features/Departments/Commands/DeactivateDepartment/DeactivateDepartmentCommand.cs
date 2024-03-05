using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.DeactivateDepartment;

[Authorize(Roles = Roles.HumanResources)]
public record DeactivateDepartmentCommand(string DepartmentId) : IRequest<Result>;
