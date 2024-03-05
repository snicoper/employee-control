using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace EmployeeControl.Application.Features.Employees.Commands.AddRoleHumanResources;

internal class AddRoleHumanResourcesHandler(
    UserManager<ApplicationUser> userManager,
    IIdentityService identityService,
    ILogger<AddRoleHumanResourcesHandler> logger)
    : IRequestHandler<AddRoleHumanResourcesCommand, Result>
{
    public async Task<Result> Handle(AddRoleHumanResourcesCommand request, CancellationToken cancellationToken)
    {
        var employee = await identityService.GetByIdAsync(request.EmployeeId);
        var identityResult = await userManager.AddToRoleAsync(employee, Roles.HumanResources);

        if (identityResult.Succeeded)
        {
            return Result.Success();
        }

        logger.LogDebug("{error}", identityResult.Errors);

        return Result.Failure(string.Empty);
    }
}
