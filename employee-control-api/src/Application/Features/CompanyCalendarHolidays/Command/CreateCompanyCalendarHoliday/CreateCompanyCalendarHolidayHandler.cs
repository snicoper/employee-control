using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.CreateCompanyCalendarHoliday;

internal class CreateCompanyCalendarHolidayHandler(ICompanyCalendarHolidaysService companyCalendarHolidaysService, IMapper mapper)
    : IRequestHandler<CreateCompanyCalendarHolidayCommand, string>
{
    public async Task<string> Handle(
        CreateCompanyCalendarHolidayCommand request,
        CancellationToken cancellationToken)
    {
        var companyHoliday = mapper.Map<CompanyCalendarHoliday>(request);
        companyHoliday = await companyCalendarHolidaysService.CreateAsync(companyHoliday, cancellationToken);
        var resultResponse = companyHoliday.Id;

        return resultResponse;
    }
}
