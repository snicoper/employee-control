using EmployeeControl.Application.Common.Interfaces.Features.CompanyCalendarHolidays;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendarHolidays.Command.DeleteCompanyCalendarHoliday;

internal class DeleteCompanyCalendarHolidayHandler(ICompanyCalendarHolidaysService companyCalendarHolidaysService)
    : IRequestHandler<DeleteCompanyCalendarHolidayCommand, Result>
{
    public async Task<Result> Handle(DeleteCompanyCalendarHolidayCommand request, CancellationToken cancellationToken)
    {
        var companyHoliday = await companyCalendarHolidaysService.GetByIdAsync(request.Id, cancellationToken);
        await companyCalendarHolidaysService.DeleteAsync(companyHoliday, cancellationToken);

        return Result.Success();
    }
}
