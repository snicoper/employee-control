using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Commands.UpdateWorkingDaysWeek;

internal class UpdateWorkingDaysWeekHandler(
    IWorkingDaysWeekService workingDaysWeekService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<UpdateWorkingDaysWeekCommand, Result>
{
    public async Task<Result> Handle(UpdateWorkingDaysWeekCommand request, CancellationToken cancellationToken)
    {
        var workingDaysWeek = await workingDaysWeekService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workingDaysWeek);
        workingDaysWeek = mapper.Map<Domain.Entities.WorkingDaysWeek>(request);

        await workingDaysWeekService.UpdateAsync(workingDaysWeek, cancellationToken);

        return Result.Success();
    }
}
