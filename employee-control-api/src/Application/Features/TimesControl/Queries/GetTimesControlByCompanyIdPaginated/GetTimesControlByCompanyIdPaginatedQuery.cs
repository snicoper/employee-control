using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByCompanyIdPaginated;

[Authorize(Roles = Roles.EnterpriseStaff)]
public record GetTimesControlByCompanyIdPaginatedQuery(
    string CompanyId,
    DateTimeOffset? From,
    DateTimeOffset? To,
    RequestData RequestData)
    : IRequest<ResponseData<GetTimesControlByCompanyIdPaginatedResponse>>;
