using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkDaysByCompanyId;

public record GetWorkDaysByCompanyIdQuery(string CompanyId) : IRequest<GetWorkDaysByCompanyIdResponse>;
