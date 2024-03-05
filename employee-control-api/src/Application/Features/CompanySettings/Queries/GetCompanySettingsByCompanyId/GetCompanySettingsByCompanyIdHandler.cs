using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompaniesSettings;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettingsByCompanyId;

internal class GetCompanySettingsByCompanyIdHandler(
    ICompanySettingsService companySettingsService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetCompanySettingsByCompanyIdQuery, GetCompanySettingsByCompanyIdResponse>
{
    public async Task<GetCompanySettingsByCompanyIdResponse> Handle(
        GetCompanySettingsByCompanyIdQuery request,
        CancellationToken cancellationToken)
    {
        var companySettings = await companySettingsService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(companySettings);
        var responseResult = mapper.Map<GetCompanySettingsByCompanyIdResponse>(companySettings);

        return responseResult;
    }
}
