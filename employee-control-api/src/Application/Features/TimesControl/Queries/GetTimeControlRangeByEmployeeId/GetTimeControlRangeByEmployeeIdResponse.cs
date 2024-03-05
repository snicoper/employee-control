using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlRangeByEmployeeId;

public record GetTimeControlRangeByEmployeeIdResponse
{
    public int Day { get; set; }

    public string? DayTitle { get; set; }

    public int TotalMinutes { get; set; }

    public ICollection<TimeControlResponse> Times { get; } = new List<TimeControlResponse>();

    public record TimeControlResponse(
        string Id,
        DateTimeOffset Start,
        DateTimeOffset Finish,
        TimeState TimeState,
        ClosedBy ClosedBy,
        int Minutes,
        double DayPercent);
}
