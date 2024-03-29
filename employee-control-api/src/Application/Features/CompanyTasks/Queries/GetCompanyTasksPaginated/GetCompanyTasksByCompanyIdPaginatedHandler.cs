using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksPaginated;

internal class GetCompanyTasksByCompanyIdPaginatedHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCompanyTasksByCompanyIdPaginatedQuery, ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>>
{
    public async Task<ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>> Handle(
        GetCompanyTasksByCompanyIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var tasks = context.CompanyTasks;

        var resultResponse = await ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>.CreateAsync(
            tasks,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
