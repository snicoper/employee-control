using AutoMapper;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;

public record GetCompanySettingsResponse(
    string Id,
    string Timezone,
    int PeriodTimeControlMax,
    int WeeklyWorkingHours,
    bool GeolocationRequired)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Domain.Entities.CompanySettings, GetCompanySettingsResponse>();
        }
    }
}
