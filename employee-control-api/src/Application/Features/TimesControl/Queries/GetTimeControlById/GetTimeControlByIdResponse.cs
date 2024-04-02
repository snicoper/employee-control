using AutoMapper;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

public record GetTimeControlByIdResponse
{
    public string Id { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public bool Incidence { get; set; }

    public string? IncidenceDescription { get; set; }

    public DateTimeOffset Start { get; set; }

    public DateTimeOffset Finish { get; set; }

    public ClosedBy ClosedBy { get; set; }

    public TimeState TimeState { get; set; }

    public DeviceType DeviceTypeStart { get; set; }

    public DeviceType? DeviceTypeFinish { get; set; }

    public double LatitudeStart { get; set; }

    public double LongitudeStart { get; set; }

    public double LatitudeFinish { get; set; }

    public double LongitudeFinish { get; set; }

    public double Duration { get; set; }

    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TimeControl, GetTimeControlByIdResponse>()
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => CalculateDuration(src)));
        }

        private double CalculateDuration(TimeControl timeControl)
        {
            var finish = timeControl.TimeState == TimeState.Close ? timeControl.Finish : DateTimeOffset.UtcNow;
            var duration = (finish - timeControl.Start).TotalMinutes;

            return duration;
        }
    }
}
