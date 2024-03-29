using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;

public interface ICompanyTaskEmailsService
{
    Task SendEmployeeAssignTaskAsync(
        Domain.Entities.CompanyTask companyTask,
        Company company,
        List<ApplicationUser> users);
}
