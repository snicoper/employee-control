using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.AssignEmployeesToTask;

internal class AssignEmployeesToTaskHandler(
    IApplicationDbContext context,
    UserManager<ApplicationUser> userManager,
    IPermissionsValidationService permissionsValidationService,
    ICompanyTaskEmailsService companyTaskEmailsService)
    : IRequestHandler<AssignEmployeesToTaskCommand, Result>
{
    public async Task<Result> Handle(AssignEmployeesToTaskCommand request, CancellationToken cancellationToken)
    {
        var companyTask = await context
            .CompanyTasks
            .Include(ct => ct.Company)
            .SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);

        if (companyTask?.Company is null)
        {
            throw new NotFoundException(nameof(CompanyTask), nameof(CompanyTask.Id));
        }

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(companyTask);

        var employees = userManager
            .Users
            .Where(au => request.EmployeeIds.Contains(au.Id) && au.CompanyId == companyTask.CompanyId)
            .ToList();

        var userCompanyTasks = new List<EmployeeCompanyTask>();

        foreach (var employee in employees)
        {
            userCompanyTasks.Add(
                new EmployeeCompanyTask
                {
                    CompanyId = companyTask.CompanyId, UserId = employee.Id, CompanyTaskId = companyTask.Id
                });
        }

        await context.EmployeeCompanyTasks.AddRangeAsync(userCompanyTasks, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        // Enviar email a los empleados asignados a la tarea.
        await companyTaskEmailsService.SendEmployeeAssignTaskAsync(companyTask, companyTask.Company, employees);

        return Result.Success();
    }
}
