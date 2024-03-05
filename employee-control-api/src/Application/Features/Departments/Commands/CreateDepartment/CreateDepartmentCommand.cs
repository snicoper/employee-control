using AutoMapper;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.CreateDepartment;

[Authorize(Roles = Roles.HumanResources)]
public record CreateDepartmentCommand(string CompanyId, string Name, string Background, string Color)
    : IRequest<CreateDepartmentResponse>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CreateDepartmentCommand, Department>();
        }
    }
}
