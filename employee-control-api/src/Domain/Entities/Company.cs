using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Compañías registradas.
/// </summary>
public class Company : BaseAuditableEntity
{
    public string Name { get; set; } = default!;

    public CompanySettings CompanySettings { get; set; } = null!;

    public WorkDays WorkDays { get; set; } = null!;

    public ICollection<Department> Departaments { get; set; } = new List<Department>();

    public ICollection<ApplicationUser> Users { get; set; } = new List<ApplicationUser>();

    public ICollection<CompanyTask> CompanyTasks { get; set; } = new List<CompanyTask>();

    public ICollection<CategoryAbsence> CategoryAbsences { get; set; } = new List<CategoryAbsence>();
}
