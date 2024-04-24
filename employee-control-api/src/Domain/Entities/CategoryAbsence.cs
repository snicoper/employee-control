using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Ausencias dinámicas de la compañía.
/// </summary>
public class CategoryAbsence : BaseAuditableEntity
{
    public string Description { get; set; } = default!;

    public string Background { get; set; } = default!;

    public string Color { get; set; } = default!;

    public bool Active { get; set; }
}
