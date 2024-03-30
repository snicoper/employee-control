using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlRangeByEmployeeId;

[Authorize(Roles = Roles.Employee)]
public record GetTimeControlRangeByEmployeeIdQuery(string EmployeeId, DateTimeOffset From, DateTimeOffset To)
    : IRequest<ICollection<GetTimeControlRangeByEmployeeIdResponse>>;
