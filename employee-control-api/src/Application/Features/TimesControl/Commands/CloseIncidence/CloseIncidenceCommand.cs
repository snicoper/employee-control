using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CloseIncidence;

[Authorize(Roles = Roles.HumanResources)]
public record CloseIncidenceCommand(string Id) : IRequest<Result>;
