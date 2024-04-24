using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

internal class GetEmployeeHolidaysByYearPaginatedHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetEmployeeHolidaysByYearPaginatedQuery, ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>>
{
    public async Task<ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>> Handle(
        GetEmployeeHolidaysByYearPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var employeeHolidays = context
            .EmployeeHolidays
            .Where(eh => eh.Year == request.Year);

        var resultResponse = await ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>.CreateAsync(
            employeeHolidays,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
