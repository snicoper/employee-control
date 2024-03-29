using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksPaginated;

internal class GetCompanyTasksPaginatedHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCompanyTasksPaginatedQuery, ResponseData<GetCompanyTasksPaginatedResponse>>
{
    public async Task<ResponseData<GetCompanyTasksPaginatedResponse>> Handle(
        GetCompanyTasksPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var tasks = context.CompanyTasks;

        var resultResponse = await ResponseData<GetCompanyTasksPaginatedResponse>.CreateAsync(
            tasks,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
