using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlIncidencesCount;

[Authorize(Roles = Roles.HumanResources)]
public record GetTimeControlIncidencesCountQuery : IRequest<GetTimeControlIncidencesCountResponse>;
