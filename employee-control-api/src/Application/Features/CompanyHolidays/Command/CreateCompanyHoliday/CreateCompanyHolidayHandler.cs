﻿using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyHolidays;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.CreateCompanyHoliday;

internal class CreateCompanyHolidayHandler(ICompanyHolidaysService companyHolidaysService, IMapper mapper)
    : IRequestHandler<CreateCompanyHolidayCommand, string>
{
    public async Task<string> Handle(
        CreateCompanyHolidayCommand request,
        CancellationToken cancellationToken)
    {
        var companyHoliday = mapper.Map<CompanyHoliday>(request);
        companyHoliday = await companyHolidaysService.CreateAsync(companyHoliday, cancellationToken);
        var resultResponse = companyHoliday.Id;

        return resultResponse;
    }
}