using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetEmployeesByCompanyTaskIdPaginated;

internal class GetEmployeesByCompanyTaskIdPaginatedHandler(
    IApplicationDbContext context,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetEmployeesByCompanyTaskIdPaginatedQuery, ResponseData<GetEmployeesByCompanyTaskIdPaginatedResponse>>
{
    public async Task<ResponseData<GetEmployeesByCompanyTaskIdPaginatedResponse>> Handle(
        GetEmployeesByCompanyTaskIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var users = context
            .EmployeeCompanyTasks
            .Include(uct => uct.User)
            .Where(uct => uct.CompanyTaskId == request.CompanyTaskId)
            .Select(uct => uct.User);

        // Validar permisos de lectura.
        if (users.Any())
        {
            var firstUser = await users.FirstAsync(cancellationToken);
            await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(firstUser);
        }

        var resultResponse = await ResponseData<GetEmployeesByCompanyTaskIdPaginatedResponse>.CreateAsync(
            users,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
