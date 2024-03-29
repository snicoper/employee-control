using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByEmployeeIdPaginated;

public class GetTimesControlByEmployeeIdPaginatedHandler(ITimesControlService timesControlService, IMapper mapper)
    : IRequestHandler<GetTimesControlByEmployeeIdPaginatedQuery, ResponseData<GetTimesControlByEmployeeIdPaginatedResponse>>
{
    public async Task<ResponseData<GetTimesControlByEmployeeIdPaginatedResponse>> Handle(
        GetTimesControlByEmployeeIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var timeControls = timesControlService.GetWithUserByEmployeeId(request.EmployeeId);

        // Si existe From y To filtra en rango, si solo existe From filtra en ese día.
        if (request.From != DateTimeOffset.MinValue && request.To != DateTimeOffset.MinValue)
        {
            timeControls = timeControls
                .Where(tc => tc.Start >= request.From && tc.Finish <= request.To);
        }
        else if (request.To == DateTimeOffset.MinValue && request.From != DateTimeOffset.MinValue)
        {
            timeControls = timeControls
                .Where(tc => tc.Start == request.From);
        }

        var resultResponse = await ResponseData<GetTimesControlByEmployeeIdPaginatedResponse>.CreateAsync(
            timeControls,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
