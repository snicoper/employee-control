using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.EmployeeHolidays;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.EmployeeHolidays;

public class EmployeeHolidaysService(IApplicationDbContext context) : IEmployeeHolidaysService
{
    public async Task<EmployeeHoliday> GetOrCreateByYearByEmployeeIdAsync(
        int year,
        string employeeId,
        CancellationToken cancellationToken)
    {
        var employeeHoliday = await context
                                  .EmployeeHolidays
                                  .SingleOrDefaultAsync(eh => eh.Year == year && eh.UserId == employeeId, cancellationToken) ??
                              await CreateEmployeeHolidayAsync(year, employeeId, cancellationToken);

        return employeeHoliday;
    }

    private async Task<EmployeeHoliday> CreateEmployeeHolidayAsync(
        int year,
        string employeeId,
        CancellationToken cancellationToken)
    {
        var employeeHoliday = new EmployeeHoliday { Year = year, TotalDays = 0, Consumed = 0, UserId = employeeId };

        context.EmployeeHolidays.Add(employeeHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return employeeHoliday;
    }
}
