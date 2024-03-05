using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;

namespace EmployeeControl.Application.Features.Localizations.Queries.CurrentLocale;

internal class CurrentLocaleHandler(IHttpContextAccessor httpContextAccessor)
    : IRequestHandler<CurrentLocaleQuery, CurrentLocaleResponse>
{
    public Task<CurrentLocaleResponse> Handle(CurrentLocaleQuery request, CancellationToken cancellationToken)
    {
        var culture = httpContextAccessor.HttpContext?.Features.Get<IRequestCultureFeature>();
        var locale = culture?.RequestCulture.Culture.ToString();

        var currentLocaleResponse = new CurrentLocaleResponse(locale);

        return Task.FromResult(currentLocaleResponse);
    }
}
