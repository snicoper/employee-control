using AutoMapper;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByEmployeeIdPaginated;

public record GetTimesControlByEmployeeIdPaginatedResponse
{
    public string Id { get; set; } = default!;

    public string UserId { get; set; } = default!;

    public string FirstName { get; set; } = default!;

    public string LastName { get; set; } = default!;

    public DateTimeOffset Start { get; set; }

    public DateTimeOffset Finish { get; set; }

    public ClosedBy ClosedBy { get; set; }

    public TimeState TimeState { get; set; }

    public DeviceType DeviceTypeStart { get; set; }

    public DeviceType DeviceTypeFinish { get; set; }

    public int Duration { get; set; }

    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TimeControl, GetTimesControlByEmployeeIdPaginatedResponse>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => (src.Finish - src.Start).TotalMinutes));
        }
    }
}
