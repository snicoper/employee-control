using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyHolidays;

public class CompanyHolidaysService(
    IApplicationDbContext context,
    ICompanyHolidaysValidatorService companyHolidaysValidatorService,
    IValidationFailureService validationFailureService)
    : ICompanyHolidaysService
{
    public async Task<CompanyHoliday> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var companyHoliday = await context
                                 .CompanyHolidays
                                 .FirstOrDefaultAsync(ch => ch.Id == id, cancellationToken) ??
                             throw new NotFoundException(nameof(CompanyHoliday), nameof(CompanyHoliday.Id));

        return companyHoliday;
    }

    public async Task<CompanyHoliday> CreateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        await companyHolidaysValidatorService.ValidateCreateHolidayInDateAsync(companyHoliday, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.CompanyHolidays.Add(companyHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return companyHoliday;
    }

    public async Task<CompanyHoliday> UpdateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        await companyHolidaysValidatorService.ValidateUpdateHolidayInDateAsync(companyHoliday, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.CompanyHolidays.Update(companyHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return companyHoliday;
    }

    public async Task DeleteAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        context.CompanyHolidays.Remove(companyHoliday);
        await context.SaveChangesAsync(cancellationToken);
    }
}
