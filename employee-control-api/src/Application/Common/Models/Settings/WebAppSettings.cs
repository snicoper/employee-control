using System.ComponentModel.DataAnnotations;

namespace EmployeeControl.Application.Common.Models.Settings;

public class WebAppSettings
{
    public const string SectionName = "WebApp";

    [Required]
    public string? Scheme { get; set; }

    [Required]
    public string? Host { get; set; }
}
