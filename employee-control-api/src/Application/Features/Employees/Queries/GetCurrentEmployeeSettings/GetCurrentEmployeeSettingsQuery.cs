using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetCurrentEmployeeSettings;

[Authorize(Roles = Roles.Employee)]
public record GetCurrentEmployeeSettingsQuery : IRequest<GetCurrentEmployeeSettingsResponse>;
