using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Constants;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksByEmployeeIdPaginated;

internal class GetCompanyTasksByEmployeeIdPaginatedHandler(
    IApplicationDbContext context,
    IIdentityService identityService,
    ICurrentUserService currentUserService,
    IMapper mapper)
    : IRequestHandler<GetCompanyTasksByEmployeeIdPaginatedQuery, ResponseData<GetCompanyTasksByEmployeeIdPaginatedResponse>>
{
    public async Task<ResponseData<GetCompanyTasksByEmployeeIdPaginatedResponse>> Handle(
        GetCompanyTasksByEmployeeIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var userCompanyTasks = context
            .EmployeeCompanyTasks
            .Include(uct => uct.CompanyTask)
            .Where(uct => uct.UserId == request.EmployeeId);

        // Si no es Staff, asegurarse que solo obtiene tareas de su compañía.
        if (!await identityService.IsInRoleAsync(currentUserService.Id, Roles.SiteStaff))
        {
            userCompanyTasks = userCompanyTasks.Where(uct => uct.CompanyId == currentUserService.CompanyId);
        }

        var companyTasks = userCompanyTasks.Select(uct => uct.CompanyTask);

        var resultResponse = await ResponseData<GetCompanyTasksByEmployeeIdPaginatedResponse>.CreateAsync(
            companyTasks,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
