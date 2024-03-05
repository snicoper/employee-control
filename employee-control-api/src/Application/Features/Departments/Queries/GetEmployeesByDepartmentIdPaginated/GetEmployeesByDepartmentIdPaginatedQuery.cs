using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetEmployeesByDepartmentIdPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeesByDepartmentIdPaginatedQuery(string DepartmentId, RequestData RequestData)
    : IRequest<ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>>;
