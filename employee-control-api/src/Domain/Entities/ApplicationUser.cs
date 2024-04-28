using System.ComponentModel.DataAnnotations.Schema;
using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Empleados de la aplicación.
/// </summary>
public class ApplicationUser : IdentityUser, IEntityDomainEvent
{
    private readonly List<BaseEvent> _domainEvents;

    public ApplicationUser()
    {
        _domainEvents = new List<BaseEvent>();

        EmployeeHolidays = new List<EmployeeHoliday>();
        EmployeeHolidayClaims = new List<EmployeeHolidayClaim>();
        EmployeeHolidayClaimLines = new List<EmployeeHolidayClaimLine>();
        TimeControls = new List<TimeControl>();
        EmployeeDepartments = new List<EmployeeDepartment>();
        EmployeeCompanyTasks = new List<EmployeeCompanyTask>();
        UserRoles = new List<IdentityUserRole<string>>();
    }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? RefreshToken { get; set; }

    public bool Active { get; set; }

    public DateTimeOffset? RefreshTokenExpiryTime { get; set; }

    public DateTimeOffset EntryDate { get; set; }

    public EmployeeSettings EmployeeSettings { get; set; } = null!;

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;

    public string CompanyCalendarId { get; set; } = default!;

    public CompanyCalendar CompanyCalendar { get; set; } = null!;

    public ICollection<EmployeeHoliday> EmployeeHolidays { get; set; }

    public ICollection<EmployeeHolidayClaim> EmployeeHolidayClaims { get; set; }

    public ICollection<EmployeeHolidayClaimLine> EmployeeHolidayClaimLines { get; set; }

    public ICollection<TimeControl> TimeControls { get; set; }

    public ICollection<EmployeeDepartment> EmployeeDepartments { get; set; }

    public ICollection<EmployeeCompanyTask> EmployeeCompanyTasks { get; set; }

    public ICollection<IdentityUserRole<string>> UserRoles { get; set; }

    [NotMapped]
    public IReadOnlyCollection<BaseEvent> DomainEvents => _domainEvents.AsReadOnly();

    public void AddDomainEvent(BaseEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    public void RemoveDomainEvent(BaseEvent domainEvent)
    {
        _domainEvents.Remove(domainEvent);
    }

    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }
}
