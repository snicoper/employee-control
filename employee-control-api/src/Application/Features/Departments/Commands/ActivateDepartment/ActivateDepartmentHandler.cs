using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.ActivateDepartment;

internal class ActivateDepartmentHandler(
    IDepartmentService departmentService,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<ActivateDepartmentCommand, Result>
{
    public async Task<Result> Handle(ActivateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await departmentService.GetByIdAsync(request.DepartmentId, cancellationToken);
        department.Active = true;

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(department);
        await departmentService.UpdateAsync(department, cancellationToken);

        return Result.Success();
    }
}
