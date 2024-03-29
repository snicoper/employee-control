using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControlByStaff;

internal class FinishTimeControlByStaffHandler(IIdentityService identityService, ITimesControlService timesControlService)
    : IRequestHandler<FinishTimeControlByStaffCommand, Result>
{
    public async Task<Result> Handle(FinishTimeControlByStaffCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.TimeControlId, cancellationToken);
        var employee = await identityService.GetByIdAsync(timeControl.UserId);

        var (result, _) = await timesControlService.FinishAsync(
            employee,
            DeviceType.System,
            ClosedBy.Staff,
            null,
            null,
            cancellationToken);

        return result;
    }
}
