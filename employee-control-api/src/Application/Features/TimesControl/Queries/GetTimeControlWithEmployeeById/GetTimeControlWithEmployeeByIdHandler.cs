using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlWithEmployeeById;

public class GetTimeControlWithEmployeeByIdHandler(
    ITimesControlService timesControlService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetTimeControlWithEmployeeByIdQuery, GetTimeControlWithEmployeeByIdResponse>
{
    public async Task<GetTimeControlWithEmployeeByIdResponse> Handle(
        GetTimeControlWithEmployeeByIdQuery request,
        CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetWithEmployeeInfoByIdAsync(request.Id, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(timeControl);
        var resultResponse = mapper.Map<GetTimeControlWithEmployeeByIdResponse>(timeControl);

        return resultResponse;
    }
}
