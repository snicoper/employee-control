using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Infrastructure.Services.CompanyHolidays;

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
