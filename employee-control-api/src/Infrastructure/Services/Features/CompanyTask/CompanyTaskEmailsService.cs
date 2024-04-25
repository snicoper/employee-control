using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Emails;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Models.Emails;
using EmployeeControl.Application.Common.Models.Settings;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;

namespace EmployeeControl.Infrastructure.Services.Features.CompanyTask;

public class CompanyTaskEmailsService(
    IEmailService emailService,
    IOptions<WebApiSettings> webApiSettings,
    IStringLocalizer<TaskLocalizer> localizer)
    : ICompanyTaskEmailsService
{
    public async Task SendEmployeeAssignTaskAsync(
        Domain.Entities.CompanyTask companyTask,
        Company company,
        List<ApplicationUser> users)
    {
        var siteName = webApiSettings.Value.SiteName ?? string.Empty;
        var companyName = company.Name;
        var companyTaskName = companyTask.Name ?? string.Empty;

        // ViewModel.
        var model = new SendEmployeeAssignTaskViewModel(siteName, companyName, companyTaskName);

        // Send email.
        emailService.Subject = localizer["Añadido en la tarea {0} desde {1}.", companyTaskName, siteName];

        foreach (var email in users.Select(user => user.Email ?? string.Empty))
        {
            emailService.To.Add(email);
        }

        await emailService.SendMailWithViewAsync(EmailViews.SendEmployeeAssignTask, model);
    }
}
