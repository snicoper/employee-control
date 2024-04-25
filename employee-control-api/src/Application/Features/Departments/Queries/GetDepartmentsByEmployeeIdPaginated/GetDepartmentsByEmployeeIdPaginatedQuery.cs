using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByEmployeeIdPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetDepartmentsByEmployeeIdPaginatedQuery(string EmployeeId, RequestData RequestData)
    : IRequest<ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>>;
