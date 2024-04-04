using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.UpdateCompanyHoliday;

internal class UpdateCompanyHolidayHandler(ICompanyHolidaysService companyHolidaysService)
    : IRequestHandler<UpdateCompanyHolidayCommand, Result>
{
    public async Task<Result> Handle(UpdateCompanyHolidayCommand request, CancellationToken cancellationToken)
    {
        var companyHoliday = await companyHolidaysService.GetByIdAsync(request.Id, cancellationToken);
        companyHoliday.Description = request.Description;
        await companyHolidaysService.UpdateAsync(companyHoliday, cancellationToken);

        return Result.Success();
    }
}
