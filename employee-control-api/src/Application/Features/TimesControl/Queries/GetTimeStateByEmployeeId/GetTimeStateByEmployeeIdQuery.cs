using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateByEmployeeId;

[Authorize(Roles = Roles.Employee)]
public record GetTimeStateByEmployeeIdQuery(string EmployeeId) : IRequest<GetTimeStateByEmployeeIdResponse>;
