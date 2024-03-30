using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CloseIncidence;

internal class CloseIncidenceHandler(ITimesControlService timesControlService)
    : IRequestHandler<CloseIncidenceCommand, Result>
{
    public async Task<Result> Handle(CloseIncidenceCommand request, CancellationToken cancellationToken)
    {
        await timesControlService.CloseIncidenceByTimeControlIdAsync(request.Id, cancellationToken);

        return Result.Success();
    }
}
