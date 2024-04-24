using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.EmployeeHolidays;
using MediatR;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearAndEmployeeId;

internal class GetEmployeeHolidaysByYearAndEmployeeIdHandler(IEmployeeHolidaysService employeeHolidaysService, IMapper mapper)
    : IRequestHandler<GetEmployeeHolidaysByYearAndEmployeeIdQuery, GetEmployeeHolidaysByYearAndEmployeeIdResponse>
{
    public async Task<GetEmployeeHolidaysByYearAndEmployeeIdResponse> Handle(
        GetEmployeeHolidaysByYearAndEmployeeIdQuery request,
        CancellationToken cancellationToken)
    {
        var employeeHoliday = await employeeHolidaysService
            .GetOrCreateByYearByEmployeeIdAsync(request.Year, request.EmployeeId, cancellationToken);

        var resultResponse = mapper.Map<GetEmployeeHolidaysByYearAndEmployeeIdResponse>(employeeHoliday);

        return resultResponse;
    }
}
