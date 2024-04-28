using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendars;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.CreateCompanyCalendar;

internal class CreateCompanyCalendarHandler(ICompanyCalendarsService companyCalendarsService, IMapper mapper)
    : IRequestHandler<CreateCompanyCalendarCommand, Result>
{
    public async Task<Result> Handle(CreateCompanyCalendarCommand request, CancellationToken cancellationToken)
    {
        var companyCalendar = mapper.Map<CompanyCalendar>(request);

        await companyCalendarsService.CreateAsync(companyCalendar, cancellationToken);

        return Result.Success();
    }
}
