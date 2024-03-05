using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetEmployeesUnassignedDepartmentByDepartmentId;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeesUnassignedDepartmentByDepartmentIdQuery(string Id)
    : IRequest<ICollection<GetEmployeesUnassignedDepartmentByDepartmentIdResponse>>;
