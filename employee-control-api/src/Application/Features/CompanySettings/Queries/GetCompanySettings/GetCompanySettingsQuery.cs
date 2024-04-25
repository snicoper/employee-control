using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;

[Authorize(Roles = Roles.Employee)]
public record GetCompanySettingsQuery : IRequest<GetCompanySettingsResponse>;
