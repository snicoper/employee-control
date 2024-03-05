using System.Security.Claims;
using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;

namespace EmployeeControl.WebApi.Services;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor)
    : ICurrentUserService
{
    public string Id => httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Sid) ?? string.Empty;

    public string CompanyId => httpContextAccessor.HttpContext?.User.FindFirstValue(CustomClaims.CompanyId) ?? string.Empty;

    public IEnumerable<string> Roles =>
        httpContextAccessor.HttpContext?.User.FindAll(ClaimTypes.Role).Select(r => r.Value) ?? new List<string>();
}
