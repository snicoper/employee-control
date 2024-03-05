using MediatR;

namespace EmployeeControl.Application.Features.Localizations.Queries.CurrentLocale;

public record CurrentLocaleQuery : IRequest<CurrentLocaleResponse>;
