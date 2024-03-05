using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Application.Features.Admin.AdminAccounts.Queries.GetAdminAccountsPaginated;

internal class GetAdminAccountsPaginatedHandler(UserManager<ApplicationUser> userManager, IMapper mapper)
    : IRequestHandler<GetAdminAccountsPaginatedQuery, ResponseData<GetAdminAccountsPaginatedResponse>>
{
    public async Task<ResponseData<GetAdminAccountsPaginatedResponse>> Handle(
        GetAdminAccountsPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var users = userManager.Users;

        var resultResponse = await ResponseData<GetAdminAccountsPaginatedResponse>.CreateAsync(
            users,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
