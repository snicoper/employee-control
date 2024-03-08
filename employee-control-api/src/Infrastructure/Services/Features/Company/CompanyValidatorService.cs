using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using EmployeeControl.Application.Localizations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Infrastructure.Services.Features.Company;

public class CompanyValidatorService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    ILogger<CompanyValidatorService> logger,
    IStringLocalizer<CompanyLocalizer> localizer)
    : ICompanyValidatorService
{
    public async Task UniqueNameValidationAsync(string name, CancellationToken cancellationToken)
    {
        var company = await context.Companies
            .AnyAsync(c => c.Name.ToLower().Equals(name), cancellationToken);

        if (!company)
        {
            return;
        }

        var message = localizer["El nombre de compañía ya existe."];
        logger.LogDebug("{message}", message);
        validationFailureService.Add("CompanyName", message);
    }
}
