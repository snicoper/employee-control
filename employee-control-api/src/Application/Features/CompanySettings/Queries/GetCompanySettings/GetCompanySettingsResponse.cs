using AutoMapper;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;

public record GetCompanySettingsResponse(
    string Id,
    string Timezone,
    int MaximumDailyWorkHours,
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
