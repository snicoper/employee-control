using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace EmployeeControl.Application.Features.Departments.Commands.AssignEmployeesToDepartment;

internal class AssignEmployeesToDepartmentHandler(
    IApplicationDbContext context,
    IDepartmentService departmentService,
    ICompanyService companyService,
    UserManager<ApplicationUser> userManager,
    IDepartmentEmailsService departmentEmailsService)
    : IRequestHandler<AssignEmployeesToDepartmentCommand, Result>
{
    public async Task<Result> Handle(AssignEmployeesToDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await departmentService.GetByIdAsync(request.Id, cancellationToken);

        var employees = userManager
            .Users
            .Where(au => request.EmployeeIds.Contains(au.Id))
            .ToList();

        var employeesToAdd = employees
            .Select(employee => new EmployeeDepartment { UserId = employee.Id, DepartmentId = department.Id })
            .ToList();

        await context.EmployeeDepartments.AddRangeAsync(employeesToAdd, cancellationToken);
        await context.SaveChangesAsync(cancellationToken);

        var company = await companyService.GetCompanyAsync(cancellationToken);

        // Enviar email a los empleados asignados a la tarea.
        await departmentEmailsService.SendEmployeeAssignDepartmentAsync(department, company, employees);

        return Result.Success();
    }
}
