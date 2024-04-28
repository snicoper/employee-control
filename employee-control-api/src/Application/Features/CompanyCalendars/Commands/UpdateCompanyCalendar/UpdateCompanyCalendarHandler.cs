using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.UpdateCompanyCalendar;

internal sealed class UpdateCompanyCalendarHandler(ICompanyCalendarsService companyCalendarsService, IMapper mapper)
    : IRequestHandler<UpdateCompanyCalendarCommand, Result>
{
    public async Task<Result> Handle(UpdateCompanyCalendarCommand request, CancellationToken cancellationToken)
    {
        var companyCalendar = await companyCalendarsService.GetByIdAsync(request.Id, cancellationToken);
        var updateCompanyCalendar = mapper.Map(request, companyCalendar);

        await companyCalendarsService.UpdateAsync(updateCompanyCalendar, cancellationToken);

        return Result.Success();
    }
}
