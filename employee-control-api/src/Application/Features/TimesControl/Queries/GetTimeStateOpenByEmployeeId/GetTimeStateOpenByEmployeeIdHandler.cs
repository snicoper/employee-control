using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateOpenByEmployeeId;

internal class GetTimeStateOpenByEmployeeIdHandler(IApplicationDbContext context)
    : IRequestHandler<GetTimeStateOpenByEmployeeIdQuery, GetTimeStateOpenByEmployeeIdResponse>
{
    public async Task<GetTimeStateOpenByEmployeeIdResponse> Handle(
        GetTimeStateOpenByEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var timeControl = await context
                              .TimeControls
                              .SingleOrDefaultAsync(
                                  ct => ct.UserId == request.EmployeeId && ct.TimeState == TimeState.Open, cancellationToken) ??
                          new TimeControl { TimeState = TimeState.Close };

        var resultResponse = new GetTimeStateOpenByEmployeeIdResponse(timeControl.Start, timeControl.TimeState);

        return resultResponse;
    }
}
