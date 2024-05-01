using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.EmployeeHolidays;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetOrCreateEmployeeHolidaysByYearAndEmployeeId;

internal class GetOrCreateEmployeeHolidaysByYearAndEmployeeIdHandler(IEmployeeHolidaysService employeeHolidaysService, IMapper mapper)
    : IRequestHandler<GetOrCreateEmployeeHolidaysByYearAndEmployeeIdQuery, GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse>
{
    public async Task<GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse> Handle(
        GetOrCreateEmployeeHolidaysByYearAndEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var employeeHoliday = await employeeHolidaysService.GetOrCreateByYearByEmployeeIdAsync(
            request.Year,
            request.EmployeeId,
            cancellationToken);

        var resultResponse = mapper.Map<GetOrCreateEmployeeHolidaysByYearAndEmployeeIdResponse>(employeeHoliday);

        return resultResponse;
    }
}
