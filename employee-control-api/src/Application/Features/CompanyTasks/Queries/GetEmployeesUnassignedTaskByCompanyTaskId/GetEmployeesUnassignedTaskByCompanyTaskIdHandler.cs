using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetEmployeesUnassignedTaskByCompanyTaskId;

internal class GetEmployeesUnassignedTaskByCompanyTaskIdHandler(
    IApplicationDbContext context,
    UserManager<ApplicationUser> userManager,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<
        GetEmployeesUnassignedTaskByCompanyTaskIdQuery,
        ICollection<GetEmployeesUnassignedTaskByCompanyTaskIdResponse>>
{
    public async Task<ICollection<GetEmployeesUnassignedTaskByCompanyTaskIdResponse>> Handle(
        GetEmployeesUnassignedTaskByCompanyTaskIdQuery request,
        CancellationToken cancellationToken)
    {
        // Obtener la tarea por su Id.
        var companyTask = await context
                              .CompanyTasks
                              .Include(ct => ct.UserCompanyTasks)
                              .ThenInclude(uct => uct.User)
                              .SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken) ??
                          throw new NotFoundException(nameof(CompanyTask), nameof(CompanyTask.Id));

        // Filtrar los Ids de los empleados que ya tienen asignada la tarea.
        var userIdsInTask = companyTask
            .UserCompanyTasks
            .Select(uct => uct.User)
            .Select(au => au!.Id)
            .ToList();

        // Obtener los empleados de la empresa excluyendo los empleados que ya tienen la tarea asignada.
        var users = userManager
            .Users
            .Include(au => au
                .UserCompanyTasks
                .Where(uct => uct.CompanyTaskId == request.Id && uct.CompanyTaskId == companyTask.Id))
            .Where(au => !userIdsInTask.Contains(au.Id) && au.CompanyId == companyTask.CompanyId);

        if (!users.Any())
        {
            return new List<GetEmployeesUnassignedTaskByCompanyTaskIdResponse>();
        }

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(users.First());

        // Preparar la respuesta.
        var resultResponse = users
            .Select(uct => new GetEmployeesUnassignedTaskByCompanyTaskIdResponse(
                uct!.Id,
                $"{uct.FirstName} {uct.LastName} <{uct.Email}>"))
            .ToList();

        return resultResponse;
    }
}
