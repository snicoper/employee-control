using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.UpdateTimeControl;

internal class UpdateTimeControlHandler(ITimesControlService timesControlService)
    : IRequestHandler<UpdateTimeControlCommand, Result>
{
    public async Task<Result> Handle(UpdateTimeControlCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.Id, cancellationToken);

        timeControl.Start = request.Start;
        timeControl.Finish = request.Finish;

        if (request.CloseIncidence)
        {
            timeControl.Incidence = false;
            timeControl.IncidenceDescription = string.Empty;
        }

        await timesControlService.UpdateAsync(timeControl, cancellationToken);

        return Result.Success();
    }
}
