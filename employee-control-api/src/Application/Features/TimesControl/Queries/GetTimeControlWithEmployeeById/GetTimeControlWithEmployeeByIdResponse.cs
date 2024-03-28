using AutoMapper;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlWithEmployeeById;

public class GetTimeControlWithEmployeeByIdResponse
{
    public string Id { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

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
            CreateMap<TimeControl, GetTimeControlWithEmployeeByIdResponse>()
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => CalculateDuration(src)))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName));
        }

        private double CalculateDuration(TimeControl timeControl)
        {
            var finish = timeControl.TimeState == TimeState.Close ? timeControl.Finish : DateTimeOffset.Now;
            var duration = (finish - timeControl.Start).TotalMinutes;

            return duration;
        }
    }
}
