using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.UpdateCategoryAbsence;

internal class UpdateCategoryAbsenceHandler(
    ICategoryAbsenceService categoryAbsenceService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<UpdateCategoryAbsenceCommand, Result>
{
    public async Task<Result> Handle(UpdateCategoryAbsenceCommand request, CancellationToken cancellationToken)
    {
        var categoryAbsence = await categoryAbsenceService.GetByIdAsync(request.Id, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(categoryAbsence);

        var categoryAbsenceUpdated = mapper.Map(request, categoryAbsence);
        await categoryAbsenceService.UpdateAsync(categoryAbsenceUpdated, cancellationToken);

        return Result.Success();
    }
}
