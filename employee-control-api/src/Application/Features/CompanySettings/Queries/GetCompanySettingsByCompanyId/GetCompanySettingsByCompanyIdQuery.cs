using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettingsByCompanyId;

public record GetCompanySettingsByCompanyIdQuery(string CompanyId) : IRequest<GetCompanySettingsByCompanyIdResponse>;
