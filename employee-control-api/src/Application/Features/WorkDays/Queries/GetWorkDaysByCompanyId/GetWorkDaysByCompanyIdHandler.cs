using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkDays;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkDaysByCompanyId;

internal class GetWorkDaysByCompanyIdHandler(
    IWorkDaysService workDaysService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetWorkDaysByCompanyIdQuery, GetWorkDaysByCompanyIdResponse>
{
    public async Task<GetWorkDaysByCompanyIdResponse> Handle(
        GetWorkDaysByCompanyIdQuery request,
        CancellationToken cancellationToken)
    {
        var workDays = await workDaysService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workDays);
        var resultResponse = mapper.Map<GetWorkDaysByCompanyIdResponse>(workDays);

        return resultResponse;
    }
}
