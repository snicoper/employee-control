using MediatR;

namespace EmployeeControl.Application.Features.Localizations.Queries.SupportedLocales;

public record SupportedLocalesQuery : IRequest<SupportedLocalesResponse>;
