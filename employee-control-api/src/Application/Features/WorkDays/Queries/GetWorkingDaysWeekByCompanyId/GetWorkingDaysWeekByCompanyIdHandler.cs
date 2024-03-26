using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkingDaysWeekByCompanyId;

internal class GetWorkingDaysWeekByCompanyIdHandler(
    IWorkingDaysWeekService workingDaysWeekService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetWorkingDaysWeekByCompanyIdQuery, GetWorkingDaysWeekByCompanyIdResponse>
{
    public async Task<GetWorkingDaysWeekByCompanyIdResponse> Handle(
        GetWorkingDaysWeekByCompanyIdQuery request,
        CancellationToken cancellationToken)
    {
        var workDays = await workingDaysWeekService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workDays);
        var resultResponse = mapper.Map<GetWorkingDaysWeekByCompanyIdResponse>(workDays);

        return resultResponse;
    }
}
