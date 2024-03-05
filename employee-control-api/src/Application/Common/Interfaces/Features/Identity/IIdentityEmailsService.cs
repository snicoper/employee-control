using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.Identity;

public interface IIdentityEmailsService
{
    Task SendValidateEmailAsync(ApplicationUser user, Domain.Entities.Company company, string code);

    Task SendInviteEmployeeAsync(ApplicationUser user, Domain.Entities.Company company, string code);

    Task SendRecoveryPasswordAsync(ApplicationUser user, string code);
}
