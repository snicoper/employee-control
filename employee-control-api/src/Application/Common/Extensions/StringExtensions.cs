using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace EmployeeControl.Application.Common.Extensions;

public static class StringExtensions
{
    /// <summary>
    /// Comprueba si un string es null.
    /// </summary>
    /// <param name="value">String a comprobar.</param>
    /// <returns>True si es null, false en caso contrario.</returns>
    public static bool IsNull(this string? value)
    {
        return value is null;
    }

    /// <summary>
    /// Devolver un string con la primera letra en minúscula.
    /// </summary>
    /// <param name="value">String a convertir.</param>
    /// <returns>El string con la primera letra en minúsculas.</returns>
    public static string LowerCaseFirst(this string value)
    {
        var result = string.IsNullOrEmpty(value) ? value : $"{value[..1].ToLower()}{value[1..]}";

        return result;
    }

    /// <summary>
    /// Devolver un string con la primera letra en mayúscula.
    /// </summary>
    /// <param name="value">String a convertir.</param>
    /// <returns>El string con la primera letra en mayúsculas.</returns>
    public static string UpperCaseFirst(this string value)
    {
        var result = string.IsNullOrEmpty(value) ? value : $"{value[..1].ToUpper()}{value[1..]}";

        return result;
    }

    /// <summary>
    /// Devolver un string con la primera letra de cada palabra en mayúscula.
    /// </summary>
    /// <param name="value">String a convertir.</param>
    /// <returns>El string con la primera letra de casa palabra en mayúsculas.</returns>
    public static string ToTile(this string value)
    {
        var parts = value.Split()
            .Select(part => part.UpperCaseFirst())
            .ToList();

        var result = string.IsNullOrEmpty(value) ? value : string.Join(" ", parts);

        return result;
    }

    /// <summary>
    /// Genera un Slug de un string.
    /// </summary>
    public static string Slugify(this string text)
    {
        const string pattern = @"[^a-zA-Z0-9\-]";
        const string replacement = "-";
        var regex = new Regex(pattern);
        var result = regex
            .Replace(RemoveDiacritics(text), replacement)
            .Replace("--", "-")
            .Trim('-');

        return result;
    }

    private static string RemoveDiacritics(string text)
    {
        var normalizedString = text.ToLower().Trim().Normalize(NormalizationForm.FormD);

        var stringBuilder = new StringBuilder();
        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        var result = stringBuilder.ToString().Normalize(NormalizationForm.FormC);

        return result;
    }
}
