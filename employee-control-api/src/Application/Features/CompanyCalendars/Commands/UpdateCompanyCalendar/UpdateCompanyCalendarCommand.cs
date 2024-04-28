using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.UpdateCompanyCalendar;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateCompanyCalendarCommand(string Id, string Name, string Description) : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateCompanyCalendarCommand, CompanyCalendar>();
        }
    }
}
