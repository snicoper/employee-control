using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceById;

[Authorize(Roles = Roles.HumanResources)]
public record GetCategoryAbsenceByIdQuery(string Id) : IRequest<GetCategoryAbsenceByIdResponse>;
