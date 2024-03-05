using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.UpdateCompanyTask;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateCompanyTaskCommand(string Id, string Name, string Background, string Color, bool Active)
    : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateCompanyTaskCommand, CompanyTask>();
        }
    }
}
