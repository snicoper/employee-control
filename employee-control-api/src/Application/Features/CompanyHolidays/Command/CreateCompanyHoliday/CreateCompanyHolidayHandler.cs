using AutoMapper;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application;

internal class CreateCompanyHolidayHandler(ICompanyHolidaysService companyHolidaysService, IMapper mapper)
    : IRequestHandler<CreateCompanyHolidayCommand, CreateCompanyHolidayResponse>
{
    public async Task<CreateCompanyHolidayResponse> Handle(CreateCompanyHolidayCommand request, CancellationToken cancellationToken)
    {
        var companyHoliday = mapper.Map<CompanyHoliday>(request);
        companyHoliday = await companyHolidaysService.CreateAsync(companyHoliday, cancellationToken);
        var resultResponse = new CreateCompanyHolidayResponse(companyHoliday.Id);

        return resultResponse;
    }
}
