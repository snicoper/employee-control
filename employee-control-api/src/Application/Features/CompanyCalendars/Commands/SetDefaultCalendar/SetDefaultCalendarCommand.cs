using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.SetDefaultCalendar;

[Authorize(Roles = Roles.HumanResources)]
public record SetDefaultCalendarCommand(string Id)
    : IRequest<Result>;
