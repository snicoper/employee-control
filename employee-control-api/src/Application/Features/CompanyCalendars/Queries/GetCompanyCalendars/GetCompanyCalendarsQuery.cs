using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendars;

[Authorize(Roles = Roles.Employee)]
public record GetCompanyCalendarsQuery : IRequest<ICollection<GetCompanyCalendarsResponse>>;
