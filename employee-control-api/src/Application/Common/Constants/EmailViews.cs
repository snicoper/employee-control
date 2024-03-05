namespace EmployeeControl.Application.Common.Constants;

/// <summary>
/// Nombres de las vistas (cshtml) para envío de Emails.
/// </summary>
public static class EmailViews
{
    public const string ValidateEmailRegistration = nameof(ValidateEmailRegistration);

    public const string InviteEmployee = nameof(InviteEmployee);

    public const string RecoveryPassword = nameof(RecoveryPassword);

    public const string SendEmployeeAssignTask = nameof(SendEmployeeAssignTask);

    public const string SendEmployeeAssignDepartment = nameof(SendEmployeeAssignDepartment);
}
