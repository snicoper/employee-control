using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByCompanyIdPaginated;

internal class GetDepartmentsByCompanyIdPaginatedHandler(
    IPermissionsValidationService permissionsValidationService,
    IDepartmentService departmentService,
    IMapper mapper)
    : IRequestHandler<GetDepartmentsByCompanyIdPaginatedQuery, ResponseData<GetDepartmentsByCompanyIdPaginatedResponse>>
{
    public async Task<ResponseData<GetDepartmentsByCompanyIdPaginatedResponse>> Handle(
        GetDepartmentsByCompanyIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var permissions = permissionsValidationService.ItsFromTheCompany(request.CompanyId);

        if (!permissions)
        {
            return new ResponseData<GetDepartmentsByCompanyIdPaginatedResponse>();
        }

        var departments = departmentService.GetAllByCompanyId(request.CompanyId);

        var resultResponse = await ResponseData<GetDepartmentsByCompanyIdPaginatedResponse>.CreateAsync(
            departments,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
