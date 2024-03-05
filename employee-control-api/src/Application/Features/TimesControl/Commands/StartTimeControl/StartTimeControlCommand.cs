using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.StartTimeControl;

[Authorize(Roles = Roles.Employee)]
public record StartTimeControlCommand(string EmployeeId, DeviceType DeviceType, double? Latitude, double? Longitude)
    : IRequest<Result>;
