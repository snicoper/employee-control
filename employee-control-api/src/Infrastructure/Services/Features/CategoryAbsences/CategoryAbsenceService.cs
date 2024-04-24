using EmployeeControl.Application.Common.Exceptions;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CategoryAbsences;
using EmployeeControl.Application.Localizations;
using EmployeeControl.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;

namespace EmployeeControl.Infrastructure.Services.Features.CategoryAbsences;

public class CategoryAbsenceService(
    IApplicationDbContext context,
    IValidationFailureService validationFailureService,
    IStringLocalizer<CategoryAbsenceLocalizer> localizer)
    : ICategoryAbsenceService
{
    public async Task<CategoryAbsence> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        var categoryAbsence = await context.CategoryAbsences.SingleOrDefaultAsync(ca => ca.Id == id, cancellationToken)
                              ?? throw new NotFoundException(nameof(CategoryAbsence), nameof(CategoryAbsence.Id));

        return categoryAbsence;
    }

    public async Task<CategoryAbsence> CreateAsync(CategoryAbsence categoryAbsence, CancellationToken cancellationToken)
    {
        var categoryExists = await context.CategoryAbsences.AnyAsync(
            ca => ca.Description.ToLower() == categoryAbsence.Description.ToLower(),
            cancellationToken);

        if (categoryExists)
        {
            var message = localizer["La descripción ya existe en la base de datos."];
            validationFailureService.AddAndRaiseException(nameof(CategoryAbsence.Description), message);
        }

        categoryAbsence.Active = true;

        context.CategoryAbsences.Add(categoryAbsence);
        await context.SaveChangesAsync(cancellationToken);

        return categoryAbsence;
    }

    public async Task<CategoryAbsence> UpdateAsync(CategoryAbsence categoryAbsence, CancellationToken cancellationToken)
    {
        var categoryAbsenceExist = await context
            .CategoryAbsences
            .AnyAsync(
                ca => ca.Description.ToLower() == categoryAbsence.Description.ToLower() && ca.Id != categoryAbsence.Id,
                cancellationToken);

        if (categoryAbsenceExist)
        {
            var message = localizer["La descripción ya existe en la base de datos."];
            validationFailureService.AddAndRaiseException(nameof(CategoryAbsence.Description), message);
        }

        context.CategoryAbsences.Update(categoryAbsence);
        await context.SaveChangesAsync(cancellationToken);

        return categoryAbsence;
    }
}
