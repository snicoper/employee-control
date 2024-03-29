using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;

internal class GetDepartmentByIdHandler(
    IDepartmentService departmentService,
    IMapper mapper)
    : IRequestHandler<GetDepartmentByIdQuery, GetDepartmentByIdResponse>
{
    public async Task<GetDepartmentByIdResponse> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
    {
        var department = await departmentService.GetByIdAsync(request.DepartmentId, cancellationToken);
        var resultResponse = mapper.Map<GetDepartmentByIdResponse>(department);

        return resultResponse;
    }
}
