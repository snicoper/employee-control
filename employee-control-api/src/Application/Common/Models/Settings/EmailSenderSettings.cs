using System.ComponentModel.DataAnnotations;

namespace EmployeeControl.Application.Common.Models.Settings;

public class EmailSenderSettings
{
    public const string SectionName = "EmailSender";

    [Required]
    public string? Host { get; set; }

    [Required]
    public string? DefaultFrom { get; set; }

    [Required]
    public string? Username { get; set; }

    [Required]
    public string? Password { get; set; }

    [Required]
    public int Port { get; set; }

    [Required]
    public bool UseSsl { get; set; }
}
