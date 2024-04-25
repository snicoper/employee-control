using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Queries.GetCompanyCalendarHolidaysByYear;

[Authorize(Roles = Roles.Employee)]
public record GetCompanyCalendarHolidaysByYearQuery(int Year) : IRequest<List<GetCompanyCalendarHolidaysByYearResponse>>;
