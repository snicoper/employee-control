using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Queries.
    GetCompanyCalendarHolidaysByCompanyCalendarIdAndYear;

[Authorize(Roles = Roles.Employee)]
public record GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearQuery(string CompanyCalendarId, int Year)
    : IRequest<List<GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearResponse>>;
