using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetEmployeeHolidaysByYearPaginatedQuery(int Year, RequestData RequestData)
    : IRequest<ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>>;
