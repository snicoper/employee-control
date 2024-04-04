using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.UpdateCompanyHoliday;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateCompanyHolidayCommand(string Id, string Description) : IRequest<Result>;
