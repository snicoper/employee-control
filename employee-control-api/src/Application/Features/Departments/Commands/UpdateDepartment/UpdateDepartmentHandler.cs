using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.UpdateDepartment;

internal class UpdateDepartmentHandler(
    IDepartmentService departmentService,
    IDepartmentValidatorService departmentValidatorService,
    IValidationFailureService validationFailureService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<UpdateDepartmentCommand, Result>
{
    public async Task<Result> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = await departmentService.GetByIdAsync(request.Id, cancellationToken);

        var departmentUpdate = mapper.Map(request, department);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(departmentUpdate);

        await departmentValidatorService.ValidateNameAsync(department, cancellationToken);
        await departmentValidatorService.ValidateBackgroundAndColorAsync(department, cancellationToken);
        validationFailureService.RaiseExceptionIfExistsErrors();

        await departmentService.UpdateAsync(departmentUpdate, cancellationToken);

        return Result.Success();
    }
}
