using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeek;

internal class GetWorkingDaysWeekHandler(IWorkingDaysWeekService workingDaysWeekService, IMapper mapper)
    : IRequestHandler<GetWorkingDaysWeekQuery, GetWorkingDaysWeekResponse>
{
    public async Task<GetWorkingDaysWeekResponse> Handle(
        GetWorkingDaysWeekQuery request,
        CancellationToken cancellationToken)
    {
        var workingDaysWeek = await workingDaysWeekService.GetWorkingDaysWeekAsync(cancellationToken);
        var resultResponse = mapper.Map<GetWorkingDaysWeekResponse>(workingDaysWeek);

        return resultResponse;
    }
}
