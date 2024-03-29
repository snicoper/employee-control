using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsencePaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetCategoryAbsencePaginatedQuery(RequestData RequestData)
    : IRequest<ResponseData<GetCategoryAbsencePaginatedResponse>>;
