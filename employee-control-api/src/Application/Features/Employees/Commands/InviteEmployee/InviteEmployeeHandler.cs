using AutoMapper;
using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Company;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Application.Features.Employees.Commands.InviteEmployee;

internal class InviteEmployeeHandler(
    IMapper mapper,
    IIdentityService identityService,
    IIdentityEmailsService identityEmailsService,
    ICompanyService companyService,
    ICurrentUserService currentUserService,
    IValidationFailureService validationFailureService,
    IStringLocalizer<IdentityLocalizer> localizer,
    ILogger<InviteEmployeeHandler> logger,
    UserManager<ApplicationUser> userManager,
    IEmployeeSettingsService employeeSettingsService)
    : IRequestHandler<InviteEmployeeCommand, string>
{
    public async Task<string> Handle(InviteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var companyId = currentUserService.CompanyId;
        if (request.CompanyId != companyId)
        {
            var message = localizer["Ha ocurrido un error y no se puede invitar al empleado."];
            logger.LogDebug("{message}: No coincide el CompanyId.", message);
            validationFailureService.AddAndRaiseException(ValidationErrorsKeys.NonFieldErrors, message);
        }

        var company = await companyService.GetByIdAsync(companyId, cancellationToken);
        var user = mapper.Map<InviteEmployeeCommand, ApplicationUser>(request);
        var password = CommonUtils.GenerateRandomPassword(10);
        var roles = new[] { Roles.Employee };

        // Crear nuevo usuario.
        var (_, employeeId) = await identityService.CreateAsync(user, password, roles, cancellationToken);

        // Configuración de empleado.
        var employeeSettings = new EmployeeSettings { UserId = user.Id, Timezone = request.TimeZone };
        await employeeSettingsService.CreateAsync(employeeSettings, cancellationToken);

        // Generar code de validación.
        var code = await userManager.GenerateEmailConfirmationTokenAsync(user);

        // Mandar email de verificación de Email.
        await identityEmailsService.SendInviteEmployeeAsync(user, company, code);

        return employeeId;
    }
}
