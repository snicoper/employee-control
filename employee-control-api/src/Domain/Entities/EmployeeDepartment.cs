using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Asociación de empleados y departamentos.
/// </summary>
public class EmployeeDepartment : BaseAuditableEntity
{
    public string DepartmentId { get; set; } = default!;

    public Department Department { get; set; } = null!;

    public string UserId { get; set; } = default!;

    public ApplicationUser User { get; set; } = null!;
}
