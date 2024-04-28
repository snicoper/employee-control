using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyCalendars.Commands.CreateCompanyCalendar;

[Authorize(Roles = Roles.HumanResources)]
public record CreateCompanyCalendarCommand(string Name, string Description, bool Default) : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CreateCompanyCalendarCommand, CompanyCalendar>();
        }
    }
}
