using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Grupo de calendario con días festivos.
/// </summary>
public class CompanyCalendar : BaseAuditableEntity
{
    public CompanyCalendar()
    {
        Users = new List<ApplicationUser>();
        CompanyCalendarHolidays = new List<CompanyCalendarHoliday>();
    }

    public string Name { get; set; } = default!;

    public string Description { get; set; } = default!;

    public bool Default { get; set; }

    public ICollection<ApplicationUser> Users { get; set; }

    public ICollection<CompanyCalendarHoliday> CompanyCalendarHolidays { get; set; }
}
