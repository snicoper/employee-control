using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Reclamos vacaciones empleado.
/// </summary>
public class EmployeeClaimHoliday : BaseAuditableEntity
{
    public DateOnly Date { get; set; }

    public bool Accepted { get; set; }

    public string? Description { get; set; }

    public string UserId { get; set; } = default!;

    public ApplicationUser User { get; set; } = null!;
}
