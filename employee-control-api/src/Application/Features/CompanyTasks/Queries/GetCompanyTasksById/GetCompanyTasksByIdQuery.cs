using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksById;

[Authorize(Roles = Roles.HumanResources)]
public record GetCompanyTasksByIdQuery(string Id) : IRequest<GetCompanyTasksByIdResponse>;
