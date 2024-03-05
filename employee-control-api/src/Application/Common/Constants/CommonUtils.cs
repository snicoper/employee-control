namespace EmployeeControl.Application.Common.Constants;

public static class CommonUtils
{
    /// <summary>
    /// Genera un password aleatorio length caracteres.
    /// </summary>
    /// <param name="length">Numero de caracteres para el password.</param>
    /// <returns>El password generado.</returns>
    public static string GenerateRandomPassword(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        var random = new Random();
        var password = new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());

        return password;
    }
}
