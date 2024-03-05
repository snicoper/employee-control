using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.Departments.Commands.AssignEmployeesToDepartment;

internal class AssignEmployeesToDepartmentHandler(
    IApplicationDbContext context,
    UserManager<ApplicationUser> userManager,
    IPermissionsValidationService permissionsValidationService,
    IDepartmentEmailsService departmentEmailsService)
    : IRequestHandler<AssignEmployeesToDepartmentCommand, Result>
{
    public async Task<Result> Handle(AssignEmployeesToDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await context
            .Departments
            .Include(ct => ct.Company)
            .SingleOrDefaultAsync(ct => ct.Id == request.Id, cancellationToken);

        if (department?.Company is null)
        {
            throw new NotFoundException(nameof(CompanyTask), nameof(CompanyTask.Id));
        }

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(department);

        var employees = userManager
            .Users
            .Where(au => request.EmployeeIds.Contains(au.Id) && au.CompanyId == department.CompanyId)
            .ToList();

        var employeesToAdd = new List<EmployeeDepartment>();

        foreach (var employee in employees)
        {
            employeesToAdd.Add(
                new EmployeeDepartment { CompanyId = department.CompanyId, UserId = employee.Id, DepartmentId = department.Id });
        }

        await context.EmployeeDepartments.AddRangeAsync(employeesToAdd, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        // Enviar email a los empleados asignados a la tarea.
        await departmentEmailsService.SendEmployeeAssignDepartmentAsync(department, department.Company, employees);

        return Result.Success();
    }
}
