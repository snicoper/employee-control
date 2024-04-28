using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendarById;

internal class GetCompanyCalendarByIdHandler(ICompanyCalendarsService companyCalendarsService, IMapper mapper)
    : IRequestHandler<GetCompanyCalendarByIdQuery, GetCompanyCalendarByIdResponse>
{
    public async Task<GetCompanyCalendarByIdResponse> Handle(
        GetCompanyCalendarByIdQuery request,
        CancellationToken cancellationToken)
    {
        var companyCalendar = await companyCalendarsService.GetByIdAsync(request.Id, cancellationToken);
        var resultResponse = mapper.Map<GetCompanyCalendarByIdResponse>(companyCalendar);

        return resultResponse;
    }
}
