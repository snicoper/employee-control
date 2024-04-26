using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetCurrentEmployee;

[Authorize(Roles = Roles.Employee)]
public record GetCurrentEmployeeQuery : IRequest<GetCurrentEmployeeResponse>;
