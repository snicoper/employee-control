using System.Globalization;

namespace EmployeeControl.Application.Common.Constants;

public static class AppCultures
{
    /// <summary>
    /// Cultura por defecto.
    /// </summary>
    public static readonly CultureInfo DefaultCulture = new("es-ES");

    private static readonly CultureInfo Es = new("es");

    private static readonly CultureInfo EsEs = new("es-ES");

    private static readonly CultureInfo En = new("en");

    private static readonly CultureInfo EnUs = new("en-US");

    /// <summary>
    /// Obtener todas las culturas disponibles.
    /// </summary>
    /// <returns>Lista CultureInfo disponibles.</returns>
    public static List<CultureInfo> GetAll()
    {
        return new List<CultureInfo> { Es, EsEs, En, EnUs };
    }
}
