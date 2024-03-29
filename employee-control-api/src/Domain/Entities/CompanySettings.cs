using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Configuración de la compañía.
/// </summary>
public class CompanySettings : BaseAuditableEntity, ICompany
{
    public string Timezone { get; set; } = default!;

    public int MaximumDailyWorkHours { get; set; } = 24;

    public int WeeklyWorkingHours { get; set; } = 40;

    public bool GeolocationRequired { get; set; }

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
