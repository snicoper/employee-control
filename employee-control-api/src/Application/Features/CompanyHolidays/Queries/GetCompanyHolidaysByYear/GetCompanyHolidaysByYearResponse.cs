using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyHolidays.Queries.GetCompanyHolidaysByYear;

public record GetCompanyHolidaysByYearResponse(string Id, DateOnly Date, string Description)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CompanyHoliday, GetCompanyHolidaysByYearResponse>();
        }
    }
}
