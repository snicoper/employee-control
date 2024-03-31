using EmployeeControl.Application;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Infrastructure;

public class CompanyHolidaysService(
    IApplicationDbContext context,
    ICompanyHolidaysValidatorService companyHolidaysValidatorService,
    IValidationFailureService validationFailureService)
    : ICompanyHolidaysService
{
    public async Task<CompanyHoliday> CreateAsync(CompanyHoliday companyHoliday, CancellationToken cancellationToken)
    {
        await companyHolidaysValidatorService.ValidateHolidayInDateAsync(companyHoliday, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        context.CompanyHolidays.Add(companyHoliday);
        await context.SaveChangesAsync(cancellationToken);

        return companyHoliday;
    }
}
