using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetDepartmentsPaginatedQuery(RequestData RequestData)
    : IRequest<ResponseData<GetDepartmentsPaginatedResponse>>;
