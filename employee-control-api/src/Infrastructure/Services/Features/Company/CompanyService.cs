using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.Company;

public class CompanyService(
    ApplicationDbContext context,
    ICompanyValidatorService companyValidatorService,
    IValidationFailureService validationFailureService)
    : ICompanyService
{
    public async Task<Domain.Entities.Company> GetByIdAsync(string companyId, CancellationToken cancellationToken)
    {
        var result = await context.Companies.SingleOrDefaultAsync(c => c.Id == companyId, cancellationToken)
                     ?? throw new NotFoundException(nameof(Domain.Entities.Company), nameof(Domain.Entities.Company));

        return result;
    }

    public async Task<Domain.Entities.Company> CreateAsync(
        Domain.Entities.Company company,
        string timezone,
        CancellationToken cancellationToken)
    {
        // Validaciones.
        await companyValidatorService.UniqueNameValidationAsync(company.Name, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        // Crear Company y establecer valores de CompanySettings.
        company.CompanySettings = new CompanySettings { CompanyId = company.Id, Timezone = timezone, MaximumDailyWorkHours = 8 };

        // Crear los días de trabajo para la compañía, por defecto días laborables de lunes a viernes.
        company.WorkingDaysWeek = new Domain.Entities.WorkingDaysWeek
        {
            CompanyId = company.Id,
            Monday = true,
            Tuesday = true,
            Wednesday = true,
            Thursday = true,
            Friday = true,
            Saturday = false,
            Sunday = false
        };

        await context.Companies.AddAsync(company, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        return company;
    }
}
