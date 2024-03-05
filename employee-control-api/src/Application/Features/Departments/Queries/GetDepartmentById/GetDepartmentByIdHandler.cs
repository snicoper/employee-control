using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;

internal class GetDepartmentByIdHandler(
    IDepartmentService departmentService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetDepartmentByIdQuery, GetDepartmentByIdResponse>
{
    public async Task<GetDepartmentByIdResponse> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
    {
        var department = await departmentService.GetByIdAsync(request.DepartmentId, cancellationToken);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(department);

        var resultResponse = mapper.Map<GetDepartmentByIdResponse>(department);

        return resultResponse;
    }
}
