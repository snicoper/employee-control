using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendars;

public record GetCompanyCalendarsResponse(string Id, string Name, string Description, bool Default)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CompanyCalendar, GetCompanyCalendarsResponse>();
        }
    }
}
