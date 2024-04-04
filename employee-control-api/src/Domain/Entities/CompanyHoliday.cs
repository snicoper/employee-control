using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Días festivos de la empresa.
/// </summary>
public class CompanyHoliday : BaseAuditableEntity, ICompany
{
    public DateOnly Date { get; set; }

    public string Description { get; set; } = default!;

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
