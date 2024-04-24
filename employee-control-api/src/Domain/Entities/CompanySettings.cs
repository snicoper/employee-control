using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Configuración de la compañía.
/// </summary>
public class CompanySettings : BaseAuditableEntity
{
    public string Timezone { get; set; } = default!;

    public int PeriodTimeControlMax { get; set; } = 24;

    public int WeeklyWorkingHours { get; set; } = 40;

    public bool GeolocationRequired { get; set; }
}
