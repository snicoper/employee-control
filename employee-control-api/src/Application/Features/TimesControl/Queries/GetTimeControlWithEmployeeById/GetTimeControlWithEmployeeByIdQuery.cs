using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlWithEmployeeById;

[Authorize(Roles = Roles.HumanResources)]
public record GetTimeControlWithEmployeeByIdQuery(string Id) : IRequest<GetTimeControlWithEmployeeByIdResponse>;
