using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.UpdateTimeControl;

internal class UpdateTimeControlHandler(
    ITimesControlService timesControlService,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<UpdateTimeControlCommand, Result>
{
    public async Task<Result> Handle(UpdateTimeControlCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.Id, cancellationToken);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(timeControl);

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
