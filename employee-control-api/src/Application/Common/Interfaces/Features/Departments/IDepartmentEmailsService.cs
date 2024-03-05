using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Common.Interfaces.Features.Departments;

public interface IDepartmentEmailsService
{
    /// <summary>
    /// Envía un email a los empleados que se les a añadido a un departamento.
    /// </summary>
    /// <param name="department"><see cref="Department" />.</param>
    /// <param name="company"><see cref="Company" />.</param>
    /// <param name="users">Lista de <see cref="ApplicationUser" /> añadidos al departamento.</param>
    Task SendEmployeeAssignDepartmentAsync(Department department, Domain.Entities.Company company, List<ApplicationUser> users);
}
