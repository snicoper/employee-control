using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Asociación de empleados y tareas de la compañía.
/// </summary>
public class EmployeeCompanyTask : BaseAuditableEntity, ICompany
{
    public string UserId { get; set; } = default!;

    public ApplicationUser User { get; set; } = null!;

    public string CompanyTaskId { get; set; } = default!;

    public CompanyTask CompanyTask { get; set; } = null!;

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
