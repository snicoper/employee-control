using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.DeleteCompanyHoliday;

internal class DeleteCompanyHolidayHandler(ICompanyHolidaysService companyHolidaysService)
    : IRequestHandler<DeleteCompanyHolidayCommand, Result>
{
    public async Task<Result> Handle(DeleteCompanyHolidayCommand request, CancellationToken cancellationToken)
    {
        var companyHoliday = await companyHolidaysService.GetByIdAsync(request.Id, cancellationToken);
        await companyHolidaysService.DeleteAsync(companyHoliday, cancellationToken);

        return Result.Success();
    }
}
