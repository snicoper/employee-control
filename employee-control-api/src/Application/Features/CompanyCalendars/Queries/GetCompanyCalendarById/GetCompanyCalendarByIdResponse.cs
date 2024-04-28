using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendarById;

public record GetCompanyCalendarByIdResponse(string Name, string Description, bool Default)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CompanyCalendar, GetCompanyCalendarByIdResponse>();
        }
    }
}
