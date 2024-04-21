using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

public record GetEmployeeHolidaysByYearPaginatedResponse(
    string Id,
    int Year,
    int TotalDays,
    int Consumed,
    string UserId,
    string FirstName,
    string LastName,
    string Email)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<EmployeeHoliday, GetEmployeeHolidaysByYearPaginatedResponse>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));
        }
    }
}
