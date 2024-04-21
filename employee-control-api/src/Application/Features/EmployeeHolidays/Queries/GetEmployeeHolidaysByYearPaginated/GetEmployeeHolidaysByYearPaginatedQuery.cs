using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

public record GetEmployeeHolidaysByYearPaginatedQuery(int Year, RequestData RequestData)
    : IRequest<ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>>;
