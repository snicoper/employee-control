using EmployeeControl.Domain.Common;
using EmployeeControl.Domain.Enums;
using EmployeeControl.Domain.Interfaces;

namespace EmployeeControl.Domain.Entities;

/// <summary>
/// Control de tiempos para empleados.
/// </summary>
public class TimeControl : BaseAuditableEntity, ICompany
{
    public DateTimeOffset Start { get; set; }

    public DateTimeOffset Finish { get; set; }

    public bool Incidence { get; set; }

    public string? IncidenceDescription { get; set; }

    public ClosedBy ClosedBy { get; set; } = ClosedBy.Unclosed;

    public TimeState TimeState { get; set; } = TimeState.Open;

    public DeviceType DeviceTypeStart { get; set; } = DeviceType.Unknown;

    public DeviceType? DeviceTypeFinish { get; set; }

    public double? LatitudeStart { get; set; }

    public double? LongitudeStart { get; set; }

    public double? LatitudeFinish { get; set; }

    public double? LongitudeFinish { get; set; }

    public string UserId { get; set; } = default!;

    public ApplicationUser User { get; set; } = null!;

    public string CompanyId { get; set; } = default!;

    public Company Company { get; set; } = null!;
}
