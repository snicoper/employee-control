using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Localizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyTask;

public class CompanyTaskService(
    IStringLocalizer<CompanyTaskLocalizer> localizer,
    IValidationFailureService validationFailureService,
    IApplicationDbContext context)
    : ICompanyTaskService
{
    public async Task<Domain.Entities.CompanyTask> GetByIdAsync(string companyTaskId, CancellationToken cancellationToken)
    {
        var result = await context
                         .CompanyTasks
                         .SingleOrDefaultAsync(cs => cs.Id == companyTaskId, cancellationToken) ??
                     throw new NotFoundException(nameof(Domain.Entities.CompanyTask), nameof(Domain.Entities.CompanyTask.Id));

        return result;
    }

    public async Task<Domain.Entities.CompanyTask> CreateAsync(
        Domain.Entities.CompanyTask newCompanyTask,
        CancellationToken cancellationToken)
    {
        var companyTaskExists = context
            .CompanyTasks
            .Where(ct => ct.CompanyId == newCompanyTask.CompanyId && ct.Name == newCompanyTask.Name);

        if (companyTaskExists.Any())
        {
            var message = localizer["El nombre de compañía ya existe."];
            validationFailureService.AddAndRaiseException(nameof(Domain.Entities.CompanyTask.Name), message);
        }

        newCompanyTask.Active = true;

        await context.CompanyTasks.AddAsync(newCompanyTask, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return newCompanyTask;
    }
}
