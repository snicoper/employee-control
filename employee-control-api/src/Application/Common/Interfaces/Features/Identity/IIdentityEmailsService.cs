using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.Identity;

public interface IIdentityEmailsService
{
    Task SendInviteEmployeeAsync(ApplicationUser user, Company company, string code);

    Task SendRecoveryPasswordAsync(ApplicationUser user, string code);
}
