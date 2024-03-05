using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.Identity;

public class EmployeeSettingsService(IApplicationDbContext context) : IEmployeeSettingsService
{
    public async Task<EmployeeSettings> GetByEmployeeIdAsync(string employeeId, CancellationToken cancellationToken)
    {
        return await context.EmployeeSettings.SingleOrDefaultAsync(es => es.UserId == employeeId, cancellationToken)
               ?? throw new NotFoundException(nameof(EmployeeSettings), nameof(EmployeeSettings.UserId));
    }

    public async Task<int> CreateAsync(EmployeeSettings employeeSettings, CancellationToken cancellationToken)
    {
        await context.EmployeeSettings.AddAsync(employeeSettings, cancellationToken);

        return await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<EmployeeSettings> UpdateAsync(EmployeeSettings employeeSettings, CancellationToken cancellationToken)
    {
        context.EmployeeSettings.Update(employeeSettings);

        await context.SaveChangesAsync(cancellationToken);

        return employeeSettings;
    }
}
