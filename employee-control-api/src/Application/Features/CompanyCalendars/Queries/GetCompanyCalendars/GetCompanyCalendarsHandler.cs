using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendars;

internal class GetCompanyCalendarsHandler(ICompanyCalendarsService companyCalendarsService, IMapper mapper)
    : IRequestHandler<GetCompanyCalendarsQuery, ICollection<GetCompanyCalendarsResponse>>
{
    public async Task<ICollection<GetCompanyCalendarsResponse>> Handle(
        GetCompanyCalendarsQuery request,
        CancellationToken cancellationToken)
    {
        var companyCalendars = await companyCalendarsService.GetAllAsync(cancellationToken);
        var resultResponse = mapper.Map<ICollection<GetCompanyCalendarsResponse>>(companyCalendars);

        return resultResponse;
    }
}
