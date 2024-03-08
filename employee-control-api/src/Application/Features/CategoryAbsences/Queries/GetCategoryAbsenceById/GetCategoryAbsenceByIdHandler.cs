using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceById;

internal class GetCategoryAbsenceByIdHandler(
    ICategoryAbsenceService categoryAbsenceService,
    IPermissionsValidationService permissionsValidationService,
    IMapper mapper)
    : IRequestHandler<GetCategoryAbsenceByIdQuery, GetCategoryAbsenceByIdResponse>
{
    public async Task<GetCategoryAbsenceByIdResponse> Handle(
        GetCategoryAbsenceByIdQuery request,
        CancellationToken cancellationToken)
    {
        var categoryAbsence = await categoryAbsenceService.GetByIdAsync(request.Id, cancellationToken);
        await permissionsValidationService.CheckEntityCompanyIsOwnerAsync(categoryAbsence);

        var resultResponse = mapper.Map<GetCategoryAbsenceByIdResponse>(categoryAbsence);

        return resultResponse;
    }
}
