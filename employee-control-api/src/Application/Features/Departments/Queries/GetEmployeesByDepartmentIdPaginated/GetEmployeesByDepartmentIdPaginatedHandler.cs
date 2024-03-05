using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.Departments.Queries.GetEmployeesByDepartmentIdPaginated;

internal class GetEmployeesByDepartmentIdPaginatedHandler(
    IApplicationDbContext context,
    IMapper mapper,
    IPermissionsValidationService permissionsValidationService)
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

        // Validar permisos de lectura.
        if (users.Any())
        {
            var firstUser = await users.FirstAsync(cancellationToken);
            await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(firstUser);
        }

        var resultResponse = await ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>.CreateAsync(
            users,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
