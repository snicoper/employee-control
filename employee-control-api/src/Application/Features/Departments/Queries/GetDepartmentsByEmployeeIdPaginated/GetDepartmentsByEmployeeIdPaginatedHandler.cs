using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByEmployeeIdPaginated;

public class GetDepartmentsByEmployeeIdPaginatedHandler(
    IDepartmentService departmentService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetDepartmentsByEmployeeIdPaginatedQuery, ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>>
{
    public async Task<ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>> Handle(
        GetDepartmentsByEmployeeIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var departments = departmentService.GetAllByEmployeeId(request.EmployeeId);

        // Comprobar permisos de lectura.
        if (departments.Any())
        {
            var firstDepartment = departments.First();
            await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(firstDepartment);
        }

        var resultResponse = await ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>.CreateAsync(
            departments,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
