using EmployeeControl.Domain.Common;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Día festivo de un calendario concreto.
/// </summary>
public class CompanyCalendarHoliday : BaseAuditableEntity
{
    public DateOnly Date { get; set; }

    public string Description { get; set; } = default!;

    public string CompanyCalendarId { get; set; } = default!;

    public CompanyCalendar CompanyCalendar { get; set; } = default!;
}
