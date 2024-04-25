using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.UpdateCompanyCalendarHoliday;

internal class UpdateCompanyCalendarHolidayHandler(ICompanyCalendarHolidaysService companyCalendarHolidaysService)
    : IRequestHandler<UpdateCompanyCalendarHolidayCommand, Result>
{
    public async Task<Result> Handle(UpdateCompanyCalendarHolidayCommand request, CancellationToken cancellationToken)
    {
        var companyHoliday = await companyCalendarHolidaysService.GetByIdAsync(request.Id, cancellationToken);
        companyHoliday.Description = request.Description;
        await companyCalendarHolidaysService.UpdateAsync(companyHoliday, cancellationToken);

        return Result.Success();
    }
}
