using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;

public interface ICompanyTaskEmailsService
{
    Task SendEmployeeAssignTaskAsync(
        Domain.Entities.CompanyTask companyTask,
        Domain.Entities.Company company,
        List<ApplicationUser> users);
}
