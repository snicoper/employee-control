using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Ausencias dinámicas de la compañía.
/// </summary>
public class CategoryAbsence : BaseAuditableEntity, ICompany
{
    public string Description { get; set; } = default!;

    public string Background { get; set; } = default!;

    public string Color { get; set; } = default!;

    public bool Active { get; set; }

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
