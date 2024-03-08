using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceByCompanyIdPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetCategoryAbsenceByCompanyIdPaginatedQuery(RequestData RequestData, string CompanyId)
    : IRequest<ResponseData<GetCategoryAbsenceByCompanyIdPaginatedResponse>>;
