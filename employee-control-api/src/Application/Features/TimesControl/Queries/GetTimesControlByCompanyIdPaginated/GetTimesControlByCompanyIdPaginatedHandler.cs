using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByCompanyIdPaginated;

public class GetTimesControlByCompanyIdPaginatedHandler(
    IPermissionsValidationService permissionsValidationService,
    ITimesControlService timesControlService,
    IMapper mapper)
    : IRequestHandler<GetTimesControlByCompanyIdPaginatedQuery, ResponseData<GetTimesControlByCompanyIdPaginatedResponse>>
{
    public async Task<ResponseData<GetTimesControlByCompanyIdPaginatedResponse>> Handle(
        GetTimesControlByCompanyIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        permissionsValidationService.ItsFromTheCompany(request.CompanyId);

        var timeControls = timesControlService.GetWithUserByCompanyId(request.CompanyId);

        // Si existe From y To filtra en rango, si solo existe From filtra en ese día.
        if (request.From != DateTimeOffset.MinValue && request.To != DateTimeOffset.MinValue)
        {
            timeControls = timeControls
                .Where(tc => tc.Start >= request.From && tc.Finish <= request.To);
        }
        else if (request.To == DateTimeOffset.MinValue && request.From != DateTimeOffset.MinValue)
        {
            timeControls = timeControls
                .Where(tc => tc.Start == request.From);
        }

        var resultResponse = await ResponseData<GetTimesControlByCompanyIdPaginatedResponse>.CreateAsync(
            timeControls,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
