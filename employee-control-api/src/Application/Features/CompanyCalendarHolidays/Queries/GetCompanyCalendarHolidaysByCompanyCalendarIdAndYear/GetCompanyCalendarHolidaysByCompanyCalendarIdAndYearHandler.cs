using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Queries.
    GetCompanyCalendarHolidaysByCompanyCalendarIdAndYear;

internal class GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearQuery,
        List<GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearResponse>>
{
    public Task<List<GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearResponse>> Handle(
        GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearQuery request,
        CancellationToken cancellationToken)
    {
        var companyHolidays = context
            .CompanyCalendarHoliday
            .Where(ch => ch.CompanyCalendarId == request.CompanyCalendarId && ch.Date.Year == request.Year)
            .OrderBy(ch => ch.Date);

        var resultResponse = mapper
            .Map<ICollection<CompanyCalendarHoliday>,
                ICollection<GetCompanyCalendarHolidaysByCompanyCalendarIdAndYearResponse>>([.. companyHolidays]);

        return Task.FromResult(resultResponse.ToList());
    }
}
