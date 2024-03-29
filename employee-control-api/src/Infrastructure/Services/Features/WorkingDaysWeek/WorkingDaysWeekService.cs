using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.WorkingDaysWeek;

public class WorkingDaysWeekService(IApplicationDbContext context) : IWorkingDaysWeekService
{
    public async Task<Domain.Entities.WorkingDaysWeek> GetWorkingDaysWeekAsync(CancellationToken cancellationToken)
    {
        var workDays = await context.WorkingDaysWeek.FirstOrDefaultAsync(cancellationToken)
                       ?? throw new NotFoundException(
                           nameof(Domain.Entities.WorkingDaysWeek),
                           nameof(Domain.Entities.WorkingDaysWeek.CompanyId));

        return workDays;
    }

    public async Task<Domain.Entities.WorkingDaysWeek> UpdateAsync(
        Domain.Entities.WorkingDaysWeek workingDaysWeek,
        CancellationToken cancellationToken)
    {
        context.WorkingDaysWeek.Update(workingDaysWeek);
        await context.SaveChangesAsync(cancellationToken);

        return workingDaysWeek;
    }
}
