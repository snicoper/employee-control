using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.SetDefaultCalendar;

internal class SetDefaultCalendarHandler(ICompanyCalendarsService companyCalendarsService)
    : IRequestHandler<SetDefaultCalendarCommand, Result>
{
    public async Task<Result> Handle(SetDefaultCalendarCommand request, CancellationToken cancellationToken)
    {
        var companyCalendar = await companyCalendarsService.GetByIdAsync(request.Id, cancellationToken);
        await companyCalendarsService.SetDefaultCalendarAsync(companyCalendar, cancellationToken);

        return Result.Success();
    }
}
