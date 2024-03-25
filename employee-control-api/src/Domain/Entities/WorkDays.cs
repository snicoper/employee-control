using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Días laborables de la compañía.
/// </summary>
public class WorkDays : BaseAuditableEntity, ICompany
{
    public bool Monday { get; set; }

    public bool Tuesday { get; set; }

    public bool Wednesday { get; set; }

    public bool Thursday { get; set; }

    public bool Friday { get; set; }

    public bool Saturday { get; set; }

    public bool Sunday { get; set; }

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
