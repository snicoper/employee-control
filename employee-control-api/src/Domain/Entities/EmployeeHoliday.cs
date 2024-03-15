using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Días de vacaciones de empleados.
/// </summary>
public class EmployeeHoliday : BaseAuditableEntity
{
    public int Year { get; set; }

    public int TotalDays { get; set; }

    public int Consumed { get; set; }

    public string UserId { get; set; } = default!;

    public ApplicationUser User { get; set; } = null!;
}
