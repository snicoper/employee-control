using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetEmployeesUnassignedTaskByCompanyTaskId;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeesUnassignedTaskByCompanyTaskIdQuery(string Id)
    : IRequest<ICollection<GetEmployeesUnassignedTaskByCompanyTaskIdResponse>>;
