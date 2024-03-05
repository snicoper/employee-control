using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByCompanyIdPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetDepartmentsByCompanyIdPaginatedQuery(string CompanyId, RequestData RequestData)
    : IRequest<ResponseData<GetDepartmentsByCompanyIdPaginatedResponse>>;
