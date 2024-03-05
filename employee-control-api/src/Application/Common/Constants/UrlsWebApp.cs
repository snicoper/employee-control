namespace EmployeeControl.Application.Common.Constants;

public static class UrlsWebApp
{
    /// <summary>
    /// Url para la validación de Email del usuario.
    /// </summary>
    public const string EmailRegisterValidate = "accounts/register-validate";

    /// <summary>
    /// Url para restablecer la contraseña olvidada.
    /// </summary>
    public const string RecoveryPasswordChange = "accounts/recovery-password-change";

    /// <summary>
    /// Url validación de una invitación por parte de una empresa.
    /// </summary>
    public const string InviteEmployee = "employee/invite-employee-validate";
}
