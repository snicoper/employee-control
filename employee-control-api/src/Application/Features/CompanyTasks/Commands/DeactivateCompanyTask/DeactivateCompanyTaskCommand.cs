using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.DeactivateCompanyTask;

[Authorize(Roles = Roles.HumanResources)]
public record DeactivateCompanyTaskCommand(string CompanyTaskId) : IRequest<Result>;
