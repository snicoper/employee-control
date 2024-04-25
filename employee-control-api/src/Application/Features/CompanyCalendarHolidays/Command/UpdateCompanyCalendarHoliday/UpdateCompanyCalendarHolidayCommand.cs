using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.UpdateCompanyCalendarHoliday;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateCompanyCalendarHolidayCommand(string Id, string Description) : IRequest<Result>;
