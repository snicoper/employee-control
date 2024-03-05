using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

[Authorize(Roles = Roles.HumanResources)]
public record GetTimeControlByIdQuery(string Id) : IRequest<GetTimeControlByIdResponse>;
