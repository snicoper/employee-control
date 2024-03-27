using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeekByCompanyId;

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
        var workingDaysWeek = await workingDaysWeekService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workingDaysWeek);
        var resultResponse = mapper.Map<GetWorkingDaysWeekByCompanyIdResponse>(workingDaysWeek);

        return resultResponse;
    }
}
