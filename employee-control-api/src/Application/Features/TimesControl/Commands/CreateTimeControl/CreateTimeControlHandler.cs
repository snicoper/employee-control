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
    : IRequestHandler<CreateTimeControlCommand, string>
{
    public async Task<string> Handle(CreateTimeControlCommand request, CancellationToken cancellationToken)
    {
        TimeControl resultResponse;
        var timeControl = mapper.Map<TimeControl>(request);

        timeControl.CompanyId = currentUserService.CompanyId;
        timeControl.Incidence = false;
        timeControl.DeviceTypeStart = request.DeviceType;

        if (request.TimeState == TimeState.Close)
        {
            timeControl.ClosedBy = ClosedBy.Staff;
            timeControl.TimeState = TimeState.Close;
            timeControl.DeviceTypeFinish = request.DeviceType;

            resultResponse = await timesControlService.CreateWithFinishAsync(timeControl, cancellationToken);
        }
        else
        {
            timeControl.Finish = timeControl.Start;
            timeControl.TimeState = TimeState.Open;

            resultResponse = await timesControlService.CreateWithOutFinishAsync(timeControl, cancellationToken);
        }

        return resultResponse.Id;
    }
}
