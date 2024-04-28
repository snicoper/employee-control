using AutoMapper;
using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Application.Features.Employees.Commands.InviteEmployee;

internal class InviteEmployeeHandler(
    IMapper mapper,
    IIdentityService identityService,
    IIdentityEmailsService identityEmailsService,
    ICompanyService companyService,
    UserManager<ApplicationUser> userManager,
    IEmployeeSettingsService employeeSettingsService)
    : IRequestHandler<InviteEmployeeCommand, string>
{
    public async Task<string> Handle(InviteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var company = await companyService.GetCompanyAsync(cancellationToken);
        var user = mapper.Map<InviteEmployeeCommand, ApplicationUser>(request);
        user.CompanyId = company.Id;

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
