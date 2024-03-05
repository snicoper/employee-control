using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;

[Authorize(Roles = Roles.Employee)]
public record GetDepartmentByIdQuery(string DepartmentId) : IRequest<GetDepartmentByIdResponse>;
