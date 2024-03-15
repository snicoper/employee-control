using AutoMapper;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkDaysByCompanyId;

public record GetWorkDaysByCompanyIdResponse(
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
            CreateMap<Domain.Entities.WorkDays, GetWorkDaysByCompanyIdResponse>();
        }
    }
}
