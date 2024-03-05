using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.TimesControl;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.DeleteTimeControl;

internal class DeleteTimeControlHandler(
    IApplicationDbContext context,
    IPermissionsValidationService permissionsValidationService,
    ITimesControlService timesControlService)
    : IRequestHandler<DeleteTimeControlCommand, Result>
{
    public async Task<Result> Handle(DeleteTimeControlCommand request, CancellationToken cancellationToken)
    {
        var timeControl = await timesControlService.GetByIdAsync(request.Id, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(timeControl);

        context.TimeControls.Remove(timeControl);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
