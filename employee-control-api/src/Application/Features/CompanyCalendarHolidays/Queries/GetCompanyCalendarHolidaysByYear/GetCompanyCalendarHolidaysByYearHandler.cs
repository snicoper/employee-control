using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Queries.GetCompanyCalendarHolidaysByYear;

internal class GetCompanyCalendarHolidaysByYearHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCompanyCalendarHolidaysByYearQuery, List<GetCompanyCalendarHolidaysByYearResponse>>
{
    public Task<List<GetCompanyCalendarHolidaysByYearResponse>> Handle(
        GetCompanyCalendarHolidaysByYearQuery request,
        CancellationToken cancellationToken)
    {
        var companyHolidays = context
            .CompanyCalendarHoliday
            .Where(ch => ch.Date.Year == request.Year)
            .OrderBy(ch => ch.Date);

        var resultResponse =
            mapper.Map<ICollection<CompanyCalendarHoliday>, ICollection<GetCompanyCalendarHolidaysByYearResponse>>(
                companyHolidays.ToList());

        return Task.FromResult(resultResponse.ToList());
    }
}
