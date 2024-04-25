using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.DeleteCompanyCalendarHoliday;

[Authorize(Roles = Roles.HumanResources)]
public record DeleteCompanyCalendarHolidayCommand(string Id) : IRequest<Result>;
