using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Commands.UpdateWorkingDaysWeek;

internal class UpdateWorkingDaysWeekHandler(
    IWorkingDaysWeekService workingDaysWeekService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<UpdateWorkingDaysWeekCommand, Result>
{
    public async Task<Result> Handle(UpdateWorkingDaysWeekCommand request, CancellationToken cancellationToken)
    {
        var workDays = await workingDaysWeekService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workDays);
        workDays = mapper.Map<Domain.Entities.WorkingDaysWeek>(request);

        await workingDaysWeekService.UpdateAsync(workDays, cancellationToken);

        return Result.Success();
    }
}
