using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByEmployeeIdPaginated;

public class GetDepartmentsByEmployeeIdPaginatedHandler(IDepartmentService departmentService, IMapper mapper)
    : IRequestHandler<GetDepartmentsByEmployeeIdPaginatedQuery, ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>>
{
    public async Task<ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>> Handle(
        GetDepartmentsByEmployeeIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var departments = departmentService.GetAllByEmployeeId(request.EmployeeId);

        var resultResponse = await ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>.CreateAsync(
            departments,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
