using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.Departments.Queries.GetEmployeesByDepartmentIdPaginated;

internal class GetEmployeesByDepartmentIdPaginatedHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetEmployeesByDepartmentIdPaginatedQuery, ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>>
{
    public async Task<ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>> Handle(
        GetEmployeesByDepartmentIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var users = context
            .EmployeeDepartments
            .Include(uct => uct.User)
            .Where(uct => uct.DepartmentId == request.DepartmentId)
            .Select(uct => uct.User);

        var resultResponse = await ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>.CreateAsync(
            users,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
