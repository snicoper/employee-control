namespace EmployeeControl.Domain.Constants;

/// <summary>
/// Los roles son jerárquicos, siempre se tiene desde el asignado hasta el mas bajo.
/// </summary>
public abstract class Roles
{
    /// <summary>
    /// Administrador de empresa.
    /// </summary>
    public const string EnterpriseAdmin = nameof(EnterpriseAdmin);

    /// <summary>
    /// Staff de empresa.
    /// </summary>
    public const string EnterpriseStaff = nameof(EnterpriseStaff);

    /// <summary>
    /// Recursos humanos (RRHH) de empresa.
    /// </summary>
    public const string HumanResources = nameof(HumanResources);

    /// <summary>
    /// Empleado de empresa.
    /// </summary>
    public const string Employee = nameof(Employee);

    /// <summary>
    /// Anónimo.
    /// </summary>
    public const string Anonymous = nameof(Anonymous);
}
