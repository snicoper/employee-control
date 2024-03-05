using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksByEmployeeIdPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetCompanyTasksByEmployeeIdPaginatedQuery(RequestData RequestData, string EmployeeId)
    : IRequest<ResponseData<GetCompanyTasksByEmployeeIdPaginatedResponse>>;
