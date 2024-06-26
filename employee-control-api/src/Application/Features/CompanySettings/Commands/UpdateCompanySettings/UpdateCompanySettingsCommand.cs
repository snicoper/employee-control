﻿using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanySettings.Commands.UpdateCompanySettings;

[Authorize(Roles = Roles.Staff)]
public record UpdateCompanySettingsCommand(
    string Id,
    string Timezone,
    int PeriodTimeControlMax,
    int WeeklyWorkingHours,
    bool GeolocationRequired)
    : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateCompanySettingsCommand, Domain.Entities.CompanySettings>();
        }
    }
}
