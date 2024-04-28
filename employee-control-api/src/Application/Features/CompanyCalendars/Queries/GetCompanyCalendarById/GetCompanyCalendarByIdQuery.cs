using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendarById;

[Authorize(Roles = Roles.HumanResources)]
public record GetCompanyCalendarByIdQuery(string Id) : IRequest<GetCompanyCalendarByIdResponse>;
