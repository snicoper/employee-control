using System.ComponentModel.DataAnnotations;

namespace EmployeeControl.Domain.Enums;

public enum DeviceType
{
    [Display(Name = "Unknown")]
    Unknown = 0,

    [Display(Name = "System")]
    System = 1,

    [Display(Name = "Desktop")]
    Desktop = 2,

    [Display(Name = "Mobile")]
    Mobile = 3,

    [Display(Name = "Table")]
    Tablet = 4
}
