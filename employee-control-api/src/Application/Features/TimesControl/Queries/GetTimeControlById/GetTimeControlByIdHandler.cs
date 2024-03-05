using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

internal class GetTimeControlByIdHandler(
    ITimesControlService timesControlService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetTimeControlByIdQuery, GetTimeControlByIdResponse>
{
    public async Task<GetTimeControlByIdResponse> Handle(GetTimeControlByIdQuery request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.Id, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(timeControl);
        var resultResponse = mapper.Map<GetTimeControlByIdResponse>(timeControl);

        return resultResponse;
    }
}
