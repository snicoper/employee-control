using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlRangeByEmployeeId;

internal class GetTimeControlRangeByEmployeeIdHandler(IDateTimeService dateTimeService, ITimesControlService timesControlService)
    : IRequestHandler<GetTimeControlRangeByEmployeeIdQuery, ICollection<GetTimeControlRangeByEmployeeIdResponse>>
{
    public async Task<ICollection<GetTimeControlRangeByEmployeeIdResponse>> Handle(
        GetTimeControlRangeByEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var timesControlGroup = await timesControlService.GetRangeByEmployeeIdAsync(
            request.EmployeeId,
            request.From,
            request.To,
            cancellationToken);

        var resultResponse = timesControlGroup
            .Select(MapTo)
            .OrderBy(group => group.Day)
            .ToList();

        return resultResponse;
    }

    private GetTimeControlRangeByEmployeeIdResponse MapTo(IGrouping<int, TimeControl> timesControlGroup)
    {
        const int minutesInDay = 60 * 24;
        var timeControlResponse = new GetTimeControlRangeByEmployeeIdResponse();
        var totalMinutes = TimeSpan.Zero;

        foreach (var control in timesControlGroup)
        {
            // Si algún tiempo Finish no esta cerrado, pone el tiempo actual y lo suma al total.
            var timeFinish = control.ClosedBy == ClosedBy.Unclosed ? dateTimeService.UtcNow : control.Finish;
            var diff = timeFinish - control.Start;
            var percent = Math.Round(diff.TotalMinutes / minutesInDay * 100, 2);
            var minutes = (int)Math.Floor(diff.TotalMinutes);

            timeControlResponse.Times.Add(
                new GetTimeControlRangeByEmployeeIdResponse.TimeControlResponse(
                    control.Id,
                    control.Start,
                    timeFinish,
                    control.Incidence,
                    control.TimeState,
                    control.ClosedBy,
                    minutes,
                    percent));

            totalMinutes += diff;
        }

        timeControlResponse.TotalMinutes = (int)Math.Floor(totalMinutes.TotalMinutes);
        timeControlResponse.Day = timesControlGroup.Key;

        if (timeControlResponse.Times.Count > 0)
        {
            timeControlResponse.DayTitle = timeControlResponse.Times.First().Start.UtcDateTime.ToString("yyyy-MM-dd");
        }

        // Ordenar por fecha de inicio el grupo.
        timeControlResponse.Times = timeControlResponse.Times.OrderBy(tc => tc.Start).ToList();

        return timeControlResponse;
    }
}
