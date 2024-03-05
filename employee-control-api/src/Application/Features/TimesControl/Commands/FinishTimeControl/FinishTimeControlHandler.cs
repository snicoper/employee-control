using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControl;

internal class FinishTimeControlHandler(IIdentityService identityService, ITimesControlService timesControlService)
    : IRequestHandler<FinishTimeControlCommand, Result>
{
    public async Task<Result> Handle(FinishTimeControlCommand request, CancellationToken cancellationToken)
    {
        var employee = await identityService.GetByIdAsync(request.EmployeeId);

        var (result, _) = await timesControlService.FinishAsync(
            employee,
            request.DeviceType,
            ClosedBy.Employee,
            request.Latitude,
            request.Longitude,
            cancellationToken);

        return result;
    }
}
