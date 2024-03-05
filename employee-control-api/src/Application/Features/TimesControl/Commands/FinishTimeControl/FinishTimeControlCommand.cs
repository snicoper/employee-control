using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControl;

[Authorize(Roles = Roles.Employee)]
public record FinishTimeControlCommand(string EmployeeId, DeviceType DeviceType, double? Latitude, double? Longitude)
    : IRequest<Result>;
