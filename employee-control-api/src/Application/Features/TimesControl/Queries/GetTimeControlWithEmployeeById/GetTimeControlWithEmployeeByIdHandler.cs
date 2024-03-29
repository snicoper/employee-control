using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlWithEmployeeById;

public class GetTimeControlWithEmployeeByIdHandler(ITimesControlService timesControlService, IMapper mapper)
    : IRequestHandler<GetTimeControlWithEmployeeByIdQuery, GetTimeControlWithEmployeeByIdResponse>
{
    public async Task<GetTimeControlWithEmployeeByIdResponse> Handle(
        GetTimeControlWithEmployeeByIdQuery request,
        CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetWithEmployeeInfoByIdAsync(request.Id, cancellationToken);
        var resultResponse = mapper.Map<GetTimeControlWithEmployeeByIdResponse>(timeControl);

        return resultResponse;
    }
}
