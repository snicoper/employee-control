using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Días festivos de la empresa.
/// </summary>
public class CompanyHoliday : BaseAuditableEntity
{
    public DateOnly Date { get; set; }

    public string Description { get; set; } = default!;
}
