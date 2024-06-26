﻿using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompaniesSettings;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Commands.UpdateCompanySettings;

internal class UpdateCompanySettingsHandler(ICompanySettingsService companySettingsService, IMapper mapper)
    : IRequestHandler<UpdateCompanySettingsCommand, Result>
{
    public async Task<Result> Handle(UpdateCompanySettingsCommand request, CancellationToken cancellationToken)
    {
        var companySettings = await companySettingsService.GetByIdAsync(request.Id, cancellationToken);
        var companySettingsUpdated = mapper.Map(request, companySettings);

        await companySettingsService.UpdateAsync(companySettingsUpdated, cancellationToken);

        return Result.Success();
    }
}
