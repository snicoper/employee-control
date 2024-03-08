using System.Net;
using System.Net.Mail;
using System.Text;
using EmployeeControl.Application.Common.Interfaces.Emails;
using EmployeeControl.Application.Common.Interfaces.Views;
using EmployeeControl.Application.Common.Models.Settings;
using EmployeeControl.Infrastructure.Exceptions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace EmployeeControl.Infrastructure.Services.Emails;

public class EmailService : IEmailService
{
    private readonly EmailSenderSettings emailSenderSettings;
    private readonly IHostEnvironment environment;
    private readonly ILogger<EmailService> logger;
    private readonly IRazorViewToStringRendererService razorViewToStringRendererService;

    public EmailService(
        IOptions<EmailSenderSettings> options,
        ILogger<EmailService> logger,
        IHostEnvironment environment,
        IRazorViewToStringRendererService razorViewToStringRendererService)
    {
        this.logger = logger;
        this.environment = environment;
        this.razorViewToStringRendererService = razorViewToStringRendererService;
        emailSenderSettings = options.Value;

        MailPriority = MailPriority.High;
        From = emailSenderSettings.DefaultFrom;
        IsBodyHtml = true;
    }

    public MailPriority MailPriority { get; set; }

    public string? From { get; set; }

    public ICollection<string> To { get; set; } = new List<string>();

    public string? Subject { get; set; }

    public string? Body { get; set; }

    public bool IsBodyHtml { get; set; }

    public async Task SendMailWithViewAsync<TModel>(string viewName, TModel model)
        where TModel : class
    {
        IsBodyHtml = true;

        Body = await razorViewToStringRendererService.RenderViewToStringAsync(
            viewName,
            model,
            new Dictionary<string, object?>());

        Send();
    }

    public void SendMail()
    {
        Send();
    }

    private void Send()
    {
        using var mailMessage = new MailMessage("snicoper@outlook.com", "snicoper@gmail.com");
        mailMessage.Subject = Subject;
        mailMessage.Body = Body;
        mailMessage.IsBodyHtml = IsBodyHtml;
        mailMessage.Priority = MailPriority;

        using var client = new SmtpClient();
        client.Host = emailSenderSettings.Host ?? string.Empty;
        client.Port = emailSenderSettings.Port;
        client.Credentials = new NetworkCredential(emailSenderSettings.Username, emailSenderSettings.Password);
        client.UseDefaultCredentials = false;
        client.EnableSsl = true;

        ValidateEmail();
        LoggerMessage();

        // Solo en Production se envían los mensajes por SMTP.
        if (!environment.IsProduction())
        {
            return;
        }

        client.Send(mailMessage);
    }

    private void ValidateEmail()
    {
        if (To.Count == 0)
        {
            throw new EmailServiceException("The value cannot be an empty string. (Parameter 'To')");
        }

        if (string.IsNullOrEmpty(Subject))
        {
            throw new EmailServiceException("The value cannot be an empty string. (Parameter 'Subject')");
        }

        if (string.IsNullOrEmpty(Body))
        {
            throw new EmailServiceException("The value cannot be an empty string. (Parameter 'Body')");
        }
    }

    private void LoggerMessage()
    {
        var to = string.Join(", ", To);
        var body = !environment.IsProduction() ? Body : "Body here.....";

        var stringBuilder = new StringBuilder();
        stringBuilder.Append("=========================================================\n");
        stringBuilder.Append($"From: {From}\n");
        stringBuilder.Append($"To: {to}\n");
        stringBuilder.Append($"Subject: {Subject}\n");
        stringBuilder.Append("=========================================================\n");
        stringBuilder.Append($"Body: {body}\n");
        stringBuilder.Append("=========================================================\n");

        logger.LogDebug("{logEmail}", stringBuilder.ToString());
    }
}
