using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksById;

internal class GetCompanyTasksByIdHandler(
    ICompanyTaskService companyTaskService,
    IMapper mapper,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<GetCompanyTasksByIdQuery, GetCompanyTasksByIdResponse>
{
    public async Task<GetCompanyTasksByIdResponse> Handle(GetCompanyTasksByIdQuery request, CancellationToken cancellationToken)
    {
        var companyTask = await companyTaskService.GetByIdAsync(request.Id, cancellationToken);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(companyTask);

        var result = mapper.Map<CompanyTask, GetCompanyTasksByIdResponse>(companyTask);

        return result;
    }
}
