using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetOrCreateEmployeeHolidaysByYearAndEmployeeId;

public record GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse
{
    public string Id { get; set; } = default!;

    public int Year { get; set; }

    public int TotalDays { get; set; }

    public int Consumed { get; set; }

    public int Available { get; set; }

    public string UserId { get; set; } = default!;

    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<EmployeeHoliday, GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse>()
                .ForMember(dest => dest.Available, opt => opt.MapFrom(src => src.TotalDays - src.Consumed));
        }
    }
}
