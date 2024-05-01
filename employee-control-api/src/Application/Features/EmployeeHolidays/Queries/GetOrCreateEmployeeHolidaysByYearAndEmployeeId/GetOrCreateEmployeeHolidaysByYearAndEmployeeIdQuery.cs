using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetOrCreateEmployeeHolidaysByYearAndEmployeeId;

[Authorize(Roles = Roles.Employee)]
public record GetOrCreateEmployeeHolidaysByYearAndEmployeeIdQuery(int Year, string EmployeeId)
    : IRequest<GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse>;
