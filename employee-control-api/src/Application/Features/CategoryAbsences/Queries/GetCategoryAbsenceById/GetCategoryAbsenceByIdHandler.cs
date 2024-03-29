using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceById;

internal class GetCategoryAbsenceByIdHandler(ICategoryAbsenceService categoryAbsenceService, IMapper mapper)
    : IRequestHandler<GetCategoryAbsenceByIdQuery, GetCategoryAbsenceByIdResponse>
{
    public async Task<GetCategoryAbsenceByIdResponse> Handle(
        GetCategoryAbsenceByIdQuery request,
        CancellationToken cancellationToken)
    {
        var categoryAbsence = await categoryAbsenceService.GetByIdAsync(request.Id, cancellationToken);
        var resultResponse = mapper.Map<GetCategoryAbsenceByIdResponse>(categoryAbsence);

        return resultResponse;
    }
}
