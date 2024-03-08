using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksByCompanyIdPaginated;

internal class GetCompanyTasksByCompanyIdPaginatedHandler(
    IApplicationDbContext context,
    IMapper mapper,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<GetCompanyTasksByCompanyIdPaginatedQuery, ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>>
{
    public async Task<ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>> Handle(
        GetCompanyTasksByCompanyIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        // Cada compañía solo puede ver sus tareas.
        permissionsValidationService.ItsFromTheCompany(request.CompanyId);

        var tasks = context
            .CompanyTasks
            .Where(c => c.CompanyId == request.CompanyId);

        var resultResponse = await ResponseData<GetCompanyTasksByCompanyIdPaginatedResponse>.CreateAsync(
            tasks,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
