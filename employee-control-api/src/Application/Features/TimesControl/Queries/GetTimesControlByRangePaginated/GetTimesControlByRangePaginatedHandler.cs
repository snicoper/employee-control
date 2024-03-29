using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByRangePaginated;

public class GetTimesControlByRangePaginatedHandler(ITimesControlService timesControlService, IMapper mapper)
    : IRequestHandler<GetTimesControlByRangePaginatedQuery, ResponseData<GetTimesControlByRangePaginatedResponse>>
{
    public async Task<ResponseData<GetTimesControlByRangePaginatedResponse>> Handle(
        GetTimesControlByRangePaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var timeControls = timesControlService.GetWithUser();

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

        var resultResponse = await ResponseData<GetTimesControlByRangePaginatedResponse>.CreateAsync(
            timeControls,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
