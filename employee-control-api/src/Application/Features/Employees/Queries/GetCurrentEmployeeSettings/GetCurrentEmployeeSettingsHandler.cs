using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetCurrentEmployeeSettings;

internal class GetCurrentEmployeeSettingsHandler(
    IEmployeeSettingsService employeeSettingsService,
    ICurrentUserService currentUserService,
    IMapper mapper)
    : IRequestHandler<GetCurrentEmployeeSettingsQuery, GetCurrentEmployeeSettingsResponse>
{
    public async Task<GetCurrentEmployeeSettingsResponse> Handle(
        GetCurrentEmployeeSettingsQuery request,
        CancellationToken cancellationToken)
    {
        var employeeSettings = await employeeSettingsService.GetByEmployeeIdAsync(currentUserService.Id, cancellationToken);
        var resultResponse = mapper.Map<GetCurrentEmployeeSettingsResponse>(employeeSettings);

        return resultResponse;
    }
}
