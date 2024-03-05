using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateByEmployeeId;

internal class GetTimeStateByEmployeeIdHandler(ITimesControlService timesControlService, IIdentityService identityService)
    : IRequestHandler<GetTimeStateByEmployeeIdQuery, GetTimeStateByEmployeeIdResponse>
{
    public async Task<GetTimeStateByEmployeeIdResponse> Handle(
        GetTimeStateByEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var employee = await identityService.GetByIdAsync(request.EmployeeId);
        var timeState = await timesControlService.GetTimeStateByEmployeeAsync(employee, cancellationToken);
        var resultResponse = new GetTimeStateByEmployeeIdResponse(timeState);

        return resultResponse;
    }
}
