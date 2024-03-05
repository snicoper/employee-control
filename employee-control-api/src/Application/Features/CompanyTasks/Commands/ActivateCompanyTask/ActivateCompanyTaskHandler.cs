using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.ActivateCompanyTask;

internal class ActivateCompanyTaskHandler(
    IApplicationDbContext context,
    ICompanyTaskService companyTaskService,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<ActivateCompanyTaskCommand, Result>
{
    public async Task<Result> Handle(ActivateCompanyTaskCommand request, CancellationToken cancellationToken)
    {
        var companyTask = await companyTaskService.GetByIdAsync(request.CompanyTaskId, cancellationToken);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(companyTask);

        companyTask.Active = true;

        context.CompanyTasks.Update(companyTask);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
