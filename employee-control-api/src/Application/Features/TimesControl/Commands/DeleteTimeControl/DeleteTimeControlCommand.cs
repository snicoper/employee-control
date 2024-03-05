using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.DeleteTimeControl;

[Authorize(Roles = Roles.HumanResources)]
public record DeleteTimeControlCommand(string Id) : IRequest<Result>;
