using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.CreateCategoryAbsence;

internal class CreateCategoryAbsenceHandler(
    ICategoryAbsenceService categoryAbsenceService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<CreateCategoryAbsenceCommand, CategoryAbsence>
{
    public async Task<CategoryAbsence> Handle(CreateCategoryAbsenceCommand request, CancellationToken cancellationToken)
    {
        var categoryAbsence = mapper.Map<CategoryAbsence>(request);

        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(categoryAbsence);
        await categoryAbsenceService.CreateAsync(categoryAbsence, cancellationToken);

        return categoryAbsence;
    }
}
