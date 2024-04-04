using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Queries.GetCompanyHolidaysByYear;

[Authorize(Roles = Roles.Employee)]
public record GetCompanyHolidaysByYearQuery(int Year) : IRequest<List<GetCompanyHolidaysByYearResponse>>;
