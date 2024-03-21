using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkDays;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Commands.UpdateWorkDays;

internal class UpdateWorkDaysHandler(
    IWorkDaysService workDaysService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<UpdateWorkDaysCommand, Result>
{
    public async Task<Result> Handle(UpdateWorkDaysCommand request, CancellationToken cancellationToken)
    {
        var workDays = await workDaysService.GetByCompanyIdAsync(request.CompanyId, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(workDays);
        workDays = mapper.Map<Domain.Entities.WorkDays>(request);

        await workDaysService.UpdateAsync(workDays, cancellationToken);

        return Result.Success();
    }
}
