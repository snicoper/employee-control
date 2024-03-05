using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Companies.Queries.GetCompanyByCurrentUser;

[Authorize(Roles = Roles.Employee)]
public record GetCompanyByCurrentUserQuery : IRequest<GetCompanyByCurrentUserResponse>;
