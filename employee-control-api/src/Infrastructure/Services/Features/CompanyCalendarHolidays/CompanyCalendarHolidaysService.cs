using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyCalendarHolidays;

public class CompanyCalendarHolidaysService(
    IApplicationDbContext context,
    ICompanyCalendarHolidaysValidatorService companyCalendarHolidaysValidatorService,
    IValidationFailureService validationFailureService)
    : ICompanyCalendarHolidaysService
{
    public async Task<CompanyCalendarHoliday> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var companyHoliday = await context
                                 .CompanyCalendarHoliday
                                 .FirstOrDefaultAsync(ch => ch.Id == id, cancellationToken) ??
                             throw new NotFoundException(nameof(CompanyCalendarHoliday), nameof(CompanyCalendarHoliday.Id));

        return companyHoliday;
    }

    public async Task<CompanyCalendarHoliday> CreateAsync(
        CompanyCalendarHoliday companyCalendarHoliday,
        CancellationToken cancellationToken)
    {
        await companyCalendarHolidaysValidatorService.ValidateCreateHolidayInDateAsync(companyCalendarHoliday, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.CompanyCalendarHoliday.Add(companyCalendarHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return companyCalendarHoliday;
    }

    public async Task<CompanyCalendarHoliday> UpdateAsync(
        CompanyCalendarHoliday companyCalendarHoliday,
        CancellationToken cancellationToken)
    {
        await companyCalendarHolidaysValidatorService.ValidateUpdateHolidayInDateAsync(companyCalendarHoliday, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.CompanyCalendarHoliday.Update(companyCalendarHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return companyCalendarHoliday;
    }

    public async Task DeleteAsync(CompanyCalendarHoliday companyCalendarHoliday, CancellationToken cancellationToken)
    {
        context.CompanyCalendarHoliday.Remove(companyCalendarHoliday);
        await context.SaveChangesAsync(cancellationToken);
    }
}
