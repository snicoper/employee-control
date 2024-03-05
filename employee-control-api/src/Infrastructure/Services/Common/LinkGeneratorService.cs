using System.Text;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Models.Settings;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeControl.Infrastructure.Services.Common;

public class LinkGeneratorService(IOptions<WebAppSettings> webAppSettings) : ILinkGeneratorService
{
    public string GenerateWebApp(string path)
    {
        return $"{webAppSettings.Value.Scheme}://{webAppSettings.Value.Host}/{path}";
    }

    public string GenerateWebApp(string path, Dictionary<string, string> queryParams, bool encodeParams = true)
    {
        var queryString = new StringBuilder();

        foreach (var (key, value) in queryParams)
        {
            var valueEncode = encodeParams ? Base64UrlEncoder.Encode(value) : value;
            var paramOperator = queryString.Length == 0 ? "?" : "&";
            queryString.Append($"{paramOperator}{key}={valueEncode}");
        }

        return $"{GenerateWebApp(path)}{queryString}";
    }
}
