using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Queries.GetWorkingDaysWeekByCompanyId;

public record GetWorkingDaysWeekByCompanyIdQuery(string CompanyId) : IRequest<GetWorkingDaysWeekByCompanyIdResponse>;
