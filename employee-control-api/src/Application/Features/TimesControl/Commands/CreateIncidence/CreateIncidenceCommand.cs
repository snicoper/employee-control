using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateIncidence;

[Authorize(Roles = Roles.Employee)]
public record CreateIncidenceCommand(string TimeControlId, string IncidenceDescription)
    : IRequest<Result>;
