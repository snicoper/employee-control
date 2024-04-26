using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Queries.GetCurrentEmployee;

internal class GetCurrentEmployeeHandler(IIdentityService identityService, IMapper mapper)
    : IRequestHandler<GetCurrentEmployeeQuery, GetCurrentEmployeeResponse>
{
    public async Task<GetCurrentEmployeeResponse> Handle(GetCurrentEmployeeQuery request, CancellationToken cancellationToken)
    {
        var user = await identityService.GetCurrentAsync();
        var resultResponse = mapper.Map<GetCurrentEmployeeResponse>(user);

        return resultResponse;
    }
}
