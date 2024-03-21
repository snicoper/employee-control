using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.WorkDays;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.WorkDays;

public class WorkDaysService(IApplicationDbContext context) : IWorkDaysService
{
    public async Task<Domain.Entities.WorkDays> GetByCompanyIdAsync(string companyId, CancellationToken cancellationToken)
    {
        var workDays = await context.WorkDays.SingleOrDefaultAsync(wd => wd.CompanyId == companyId, cancellationToken)
                       ?? throw new NotFoundException(
                           nameof(Domain.Entities.WorkDays),
                           nameof(Domain.Entities.WorkDays.CompanyId));

        return workDays;
    }

    public async Task<Domain.Entities.WorkDays> UpdateAsync(Domain.Entities.WorkDays workDays, CancellationToken cancellationToken)
    {
        context.WorkDays.Update(workDays);
        await context.SaveChangesAsync(cancellationToken);

        return workDays;
    }
}
