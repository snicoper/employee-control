using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateIncidence;

internal class CreateIncidenceHandler(ITimesControlService timesControlService)
    : IRequestHandler<CreateIncidenceCommand, Result>
{
    public async Task<Result> Handle(CreateIncidenceCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.TimeControlId, cancellationToken);
        timeControl.Incidence = true;
        timeControl.IncidenceDescription = request.IncidenceDescription;
        await timesControlService.UpdateAsync(timeControl, cancellationToken);

        return Result.Success();
    }
}
