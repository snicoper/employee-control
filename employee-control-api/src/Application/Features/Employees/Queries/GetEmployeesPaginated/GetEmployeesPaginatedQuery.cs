using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetEmployeesPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeesPaginatedQuery(RequestData RequestData) : IRequest<ResponseData<GetEmployeesPaginatedResponse>>;
