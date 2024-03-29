using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompaniesSettings;
using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;

internal class GetCompanySettingsHandler(ICompanySettingsService companySettingsService, IMapper mapper)
    : IRequestHandler<GetCompanySettingsQuery, GetCompanySettingsResponse>
{
    public async Task<GetCompanySettingsResponse> Handle(
        GetCompanySettingsQuery request,
        CancellationToken cancellationToken)
    {
        var companySettings = await companySettingsService.GetCompanySettingsAsync(cancellationToken);
        var responseResult = mapper.Map<GetCompanySettingsResponse>(companySettings);

        return responseResult;
    }
}
