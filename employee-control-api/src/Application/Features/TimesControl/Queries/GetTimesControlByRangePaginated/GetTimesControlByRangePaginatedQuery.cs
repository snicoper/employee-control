using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByRangePaginated;

[Authorize(Roles = Roles.EnterpriseStaff)]
public record GetTimesControlByRangePaginatedQuery(DateTimeOffset? From, DateTimeOffset? To, RequestData RequestData)
    : IRequest<ResponseData<GetTimesControlByRangePaginatedResponse>>;
