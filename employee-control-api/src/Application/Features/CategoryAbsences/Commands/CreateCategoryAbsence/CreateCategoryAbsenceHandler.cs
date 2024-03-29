using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.CreateCategoryAbsence;

internal class CreateCategoryAbsenceHandler(ICategoryAbsenceService categoryAbsenceService, IMapper mapper)
    : IRequestHandler<CreateCategoryAbsenceCommand, CategoryAbsence>
{
    public async Task<CategoryAbsence> Handle(CreateCategoryAbsenceCommand request, CancellationToken cancellationToken)
    {
        var categoryAbsence = mapper.Map<CategoryAbsence>(request);
        await categoryAbsenceService.CreateAsync(categoryAbsence, cancellationToken);

        return categoryAbsence;
    }
}
