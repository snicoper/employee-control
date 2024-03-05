using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Admin.AdminAccounts.Queries.GetAdminAccountsPaginated;

[Authorize(Roles = Roles.SiteAdmin)]
public record GetAdminAccountsPaginatedQuery(RequestData RequestData)
    : IRequest<ResponseData<GetAdminAccountsPaginatedResponse>>;
