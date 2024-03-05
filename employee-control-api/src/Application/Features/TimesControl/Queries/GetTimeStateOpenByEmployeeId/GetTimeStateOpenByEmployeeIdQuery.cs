using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateOpenByEmployeeId;

[Authorize(Roles = Roles.Employee)]
public record GetTimeStateOpenByEmployeeIdQuery(string EmployeeId) : IRequest<GetTimeStateOpenByEmployeeIdResponse>;
