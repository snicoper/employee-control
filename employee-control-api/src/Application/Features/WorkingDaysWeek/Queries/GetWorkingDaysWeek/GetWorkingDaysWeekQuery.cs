using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeek;

public record GetWorkingDaysWeekQuery : IRequest<GetWorkingDaysWeekResponse>;
