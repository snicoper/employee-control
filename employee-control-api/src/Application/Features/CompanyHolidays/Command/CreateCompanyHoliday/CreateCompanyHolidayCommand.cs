using AutoMapper;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyHolidays.Command.CreateCompanyHoliday;

[Authorize(Roles = Roles.HumanResources)]
public record CreateCompanyHolidayCommand(DateOnly Date, string Description)
    : IRequest<string>
{
    internal class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CreateCompanyHolidayCommand, CompanyHoliday>();
        }
    }
}
