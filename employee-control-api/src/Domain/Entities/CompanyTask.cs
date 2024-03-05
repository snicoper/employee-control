using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Tareas en la compañía.
/// </summary>
public class CompanyTask : BaseAuditableEntity, ICompany
{
    public string Name { get; set; } = default!;

    public bool Active { get; set; }

    public string Background { get; set; } = default!;

    public string Color { get; set; } = default!;

    public ICollection<EmployeeCompanyTask> UserCompanyTasks { get; set; } = new List<EmployeeCompanyTask>();

    public Company Company { get; set; } = null!;

    public string CompanyId { get; set; } = default!;
}
