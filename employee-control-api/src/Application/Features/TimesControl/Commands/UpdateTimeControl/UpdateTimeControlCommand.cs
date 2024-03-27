using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.UpdateTimeControl;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateTimeControlCommand(string Id, DateTimeOffset Start, DateTimeOffset Finish, bool CloseIncidence)
    : IRequest<Result>;
