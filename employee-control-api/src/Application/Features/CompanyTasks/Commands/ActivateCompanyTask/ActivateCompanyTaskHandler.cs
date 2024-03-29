using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.ActivateCompanyTask;

internal class ActivateCompanyTaskHandler(IApplicationDbContext context, ICompanyTaskService companyTaskService)
    : IRequestHandler<ActivateCompanyTaskCommand, Result>
{
    public async Task<Result> Handle(ActivateCompanyTaskCommand request, CancellationToken cancellationToken)
    {
        var companyTask = await companyTaskService.GetByIdAsync(request.CompanyTaskId, cancellationToken);
        companyTask.Active = true;

        context.CompanyTasks.Update(companyTask);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
