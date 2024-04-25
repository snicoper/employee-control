using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Queries.GetCompanyCalendarHolidaysByYear;

public record GetCompanyCalendarHolidaysByYearResponse(string Id, DateOnly Date, string Description)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CompanyCalendarHoliday, GetCompanyCalendarHolidaysByYearResponse>();
        }
    }
}
