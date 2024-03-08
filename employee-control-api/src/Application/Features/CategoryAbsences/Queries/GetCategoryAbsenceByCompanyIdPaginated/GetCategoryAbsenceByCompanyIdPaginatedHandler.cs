using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceByCompanyIdPaginated;

internal class GetCategoryAbsenceByCompanyIdPaginatedHandler(
    IApplicationDbContext context,
    IMapper mapper,
    IPermissionsValidationService permissionsValidationService)
    : IRequestHandler<GetCategoryAbsenceByCompanyIdPaginatedQuery, ResponseData<GetCategoryAbsenceByCompanyIdPaginatedResponse>>
{
    public async Task<ResponseData<GetCategoryAbsenceByCompanyIdPaginatedResponse>> Handle(
        GetCategoryAbsenceByCompanyIdPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        permissionsValidationService.ItsFromTheCompany(request.CompanyId);

        var categoryAbsences = context
            .CategoryAbsences
            .Where(ca => ca.CompanyId == request.CompanyId);

        var resultResponse = await ResponseData<GetCategoryAbsenceByCompanyIdPaginatedResponse>.CreateAsync(
            categoryAbsences,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
