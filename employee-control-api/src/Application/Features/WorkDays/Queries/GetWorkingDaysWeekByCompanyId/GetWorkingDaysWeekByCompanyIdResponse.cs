using AutoMapper;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkingDaysWeekByCompanyId;

public record GetWorkingDaysWeekByCompanyIdResponse(
    string Id,
    bool Monday,
    bool Tuesday,
    bool Wednesday,
    bool Thursday,
    bool Friday,
    bool Saturday,
    bool Sunday,
    string CompanyId)
{
    internal class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<Domain.Entities.WorkingDaysWeek, GetWorkingDaysWeekByCompanyIdResponse>();
        }
    }
}
