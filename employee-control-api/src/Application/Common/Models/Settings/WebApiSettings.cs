using System.ComponentModel.DataAnnotations;

namespace EmployeeControl.Application.Common.Models.Settings;

public class WebApiSettings
{
    public const string SectionName = "WebApi";

    [Required]
    public string? SiteName { get; set; }

    [Required]
    public string? Scheme { get; set; }

    [Required]
    public string? Host { get; set; }

    [Required]
    public string? ApiSegment { get; set; }
}
