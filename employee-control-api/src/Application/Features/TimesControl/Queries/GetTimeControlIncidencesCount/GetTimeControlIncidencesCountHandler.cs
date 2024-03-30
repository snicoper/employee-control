using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlIncidencesCount;

internal class GetTimeControlIncidencesCountHandler(ITimesControlService timesControlService)
    : IRequestHandler<GetTimeControlIncidencesCountQuery, GetTimeControlIncidencesCountResponse>
{
    public Task<GetTimeControlIncidencesCountResponse> Handle(
        GetTimeControlIncidencesCountQuery request,
        CancellationToken cancellationToken)
    {
        var incidences = timesControlService.GetTimesControlIncidencesQueryable().Count();
        var resultResponse = new GetTimeControlIncidencesCountResponse(incidences);

        return Task.FromResult(resultResponse);
    }
}
