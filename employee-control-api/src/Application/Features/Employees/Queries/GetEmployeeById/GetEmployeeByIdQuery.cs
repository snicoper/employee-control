using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetEmployeeById;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeeByIdQuery(string Id) : IRequest<GetEmployeeByIdResponse>;
