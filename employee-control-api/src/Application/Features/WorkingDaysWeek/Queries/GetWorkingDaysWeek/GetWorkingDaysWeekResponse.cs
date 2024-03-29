using AutoMapper;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeek;

public record GetWorkingDaysWeekResponse(
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
            CreateMap<Domain.Entities.WorkingDaysWeek, GetWorkingDaysWeekResponse>();
        }
    }
}
