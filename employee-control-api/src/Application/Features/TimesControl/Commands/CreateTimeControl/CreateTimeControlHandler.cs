using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateTimeControl;

internal class CreateTimeControlHandler(
    IMapper mapper,
    ICurrentUserService currentUserService,
    ITimesControlService timesControlService)
    : IRequestHandler<CreateTimeControlCommand, TimeControl>
{
    public async Task<TimeControl> Handle(CreateTimeControlCommand request, CancellationToken cancellationToken)
    {
        var timeControl = mapper.Map<TimeControl>(request);

        timeControl.CompanyId = currentUserService.CompanyId;
        timeControl.ClosedBy = ClosedBy.Staff;
        timeControl.TimeState = TimeState.Close;
        timeControl.DeviceTypeStart = request.DeviceType;
        timeControl.DeviceTypeFinish = request.DeviceType;

        var resultResponse = await timesControlService.CreateAsync(timeControl, cancellationToken);

        return resultResponse;
    }
}
