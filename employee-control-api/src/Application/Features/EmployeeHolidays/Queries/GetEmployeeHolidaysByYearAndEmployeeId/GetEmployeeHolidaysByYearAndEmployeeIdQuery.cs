using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearAndEmployeeId;

[Authorize(Roles = Roles.Employee)]
public record GetEmployeeHolidaysByYearAndEmployeeIdQuery(int Year, string EmployeeId)
    : IRequest<GetEmployeeHolidaysByYearAndEmployeeIdResponse>;
