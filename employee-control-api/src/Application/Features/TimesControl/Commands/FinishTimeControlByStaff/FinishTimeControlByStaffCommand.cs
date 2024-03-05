using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControlByStaff;

[Authorize(Roles = Roles.HumanResources)]
public record FinishTimeControlByStaffCommand(string TimeControlId) : IRequest<Result>;
