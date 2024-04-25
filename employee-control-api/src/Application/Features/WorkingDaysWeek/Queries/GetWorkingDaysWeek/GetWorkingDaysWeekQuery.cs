using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeek;

[Authorize(Roles = Roles.Employee)]
public record GetWorkingDaysWeekQuery : IRequest<GetWorkingDaysWeekResponse>;
