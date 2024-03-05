using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.StartTimeControl;

internal class StartTimeControlHandler(ITimesControlService timesControlService, IIdentityService identityService)
    : IRequestHandler<StartTimeControlCommand, Result>
{
    public async Task<Result> Handle(StartTimeControlCommand request, CancellationToken cancellationToken)
    {
        var employee = await identityService.GetByIdAsync(request.EmployeeId);

        var (result, _) = await timesControlService.StartAsync(
            employee,
            request.DeviceType,
            request.Latitude,
            request.Longitude,
            cancellationToken);

        return result;
    }
}
