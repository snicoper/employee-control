using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByEmployeeIdPaginated;

[Authorize(Roles = Roles.Staff)]
public record GetTimesControlByEmployeeIdPaginatedQuery(
    string EmployeeId,
    DateTimeOffset? From,
    DateTimeOffset? To,
    RequestData RequestData)
    : IRequest<ResponseData<GetTimesControlByEmployeeIdPaginatedResponse>>;
