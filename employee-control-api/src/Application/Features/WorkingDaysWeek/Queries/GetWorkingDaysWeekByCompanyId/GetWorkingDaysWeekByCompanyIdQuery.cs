using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeekByCompanyId;

public record GetWorkingDaysWeekByCompanyIdQuery(string CompanyId) : IRequest<GetWorkingDaysWeekByCompanyIdResponse>;
