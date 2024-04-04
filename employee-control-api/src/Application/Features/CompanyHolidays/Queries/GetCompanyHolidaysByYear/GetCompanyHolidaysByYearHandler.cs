using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Queries.GetCompanyHolidaysByYear;

internal class GetCompanyHolidaysByYearHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCompanyHolidaysByYearQuery, List<GetCompanyHolidaysByYearResponse>>
{
    public Task<List<GetCompanyHolidaysByYearResponse>> Handle(
        GetCompanyHolidaysByYearQuery request,
        CancellationToken cancellationToken)
    {
        var companyHolidays = context
            .CompanyHolidays
            .Where(ch => ch.Date.Year == request.Year)
            .OrderBy(ch => ch.Date);

        var resultResponse =
            mapper.Map<ICollection<CompanyHoliday>, ICollection<GetCompanyHolidaysByYearResponse>>(companyHolidays.ToList());

        return Task.FromResult(resultResponse.ToList());
    }
}
