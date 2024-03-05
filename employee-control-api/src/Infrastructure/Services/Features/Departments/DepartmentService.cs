using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Infrastructure.Services.Features.Departments;

public class DepartmentService(
    IApplicationDbContext context,
    IDepartmentValidatorService departmentValidatorService,
    IValidationFailureService validationFailureService)
    : IDepartmentService
{
    public IQueryable<Department> GetAllByCompanyId(string companyId)
    {
        var departments = context
            .Departments
            .Where(d => d.CompanyId == companyId);

        return departments;
    }

    public IQueryable<Department> GetAllByEmployeeId(string employeeId)
    {
        var departments = context
            .EmployeeDepartments
            .Include(ud => ud.Department)
            .Where(ud => ud.UserId == employeeId)
            .Select(ud => ud.Department);

        return departments;
    }

    public async Task<Department> GetByIdAsync(string departmentId, CancellationToken cancellationToken)
    {
        var department = await context
                             .Departments
                             .SingleOrDefaultAsync(d => d.Id == departmentId, cancellationToken) ??
                         throw new NotFoundException(nameof(Department), nameof(Department.Id));

        return department;
    }

    public async Task<Department> CreateAsync(Department department, CancellationToken cancellationToken)
    {
        // Validaciones.
        await departmentValidatorService.ValidateNameAsync(department, cancellationToken);
        await departmentValidatorService.ValidateBackgroundAndColorAsync(department, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        // Crear departamento.
        context.Departments.Add(department);
        await context.SaveChangesAsync(cancellationToken);

        return department;
    }

    public async Task<Department> UpdateAsync(Department department, CancellationToken cancellationToken)
    {
        context.Departments.Update(department);
        await context.SaveChangesAsync(cancellationToken);

        return department;
    }
}
