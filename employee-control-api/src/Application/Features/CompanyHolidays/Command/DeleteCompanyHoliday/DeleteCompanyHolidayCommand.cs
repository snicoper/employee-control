using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.DeleteCompanyHoliday;

[Authorize(Roles = Roles.HumanResources)]
public record DeleteCompanyHolidayCommand(string Id) : IRequest<Result>;
