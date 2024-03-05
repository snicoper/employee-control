using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.ActivateDepartment;

[Authorize(Roles = Roles.HumanResources)]
public record ActivateDepartmentCommand(string DepartmentId) : IRequest<Result>;
