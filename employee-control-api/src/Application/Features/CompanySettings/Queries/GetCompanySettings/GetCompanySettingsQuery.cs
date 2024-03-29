using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;

public record GetCompanySettingsQuery : IRequest<GetCompanySettingsResponse>;
