using AutoMapper;
using EmployeeControl.Application.Common.Constants;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Constants;
using MediatR;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployee;

internal class UpdateEmployeeHandler(
    IIdentityService identityService,
    IMapper mapper,
    ICurrentUserService currentUserService,
    IValidationFailureService validationFailureService,
    IStringLocalizer<IdentityLocalizer> localizer)
    : IRequestHandler<UpdateEmployeeCommand, Result>
{
    public async Task<Result> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var user = await identityService.GetByIdAsync(request.Id);

        // Un usuario no puede editarse asi mismo.
        if (currentUserService.Id == user.Id)
        {
            var message = localizer["No te puedes editar a ti mismo."];
            validationFailureService.Add(ValidationErrorsKeys.NonFieldErrors, message);
        }

        // No es posible editar a un usuario con role.
        if (await identityService.IsInRoleAsync(user.Id, Roles.EnterpriseAdmin))
        {
            var message = localizer["No se puede editar a un administrador."];
            validationFailureService.Add(ValidationErrorsKeys.NonFieldErrors, message);
        }

        validationFailureService.RaiseExceptionIfExistsErrors();

        // Update employee.
        var userUpdate = mapper.Map(request, user);
        var result = await identityService.UpdateAsync(userUpdate, cancellationToken);

        return result;
    }
}
