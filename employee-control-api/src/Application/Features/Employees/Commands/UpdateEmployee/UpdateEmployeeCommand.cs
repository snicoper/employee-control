using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployee;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateEmployeeCommand(
        string Id,
        string FirstName,
        string LastName,
        string Email,
        string? PhoneNumber,
        DateTimeOffset? EntryDate)
    : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateEmployeeCommand, ApplicationUser>();
        }
    }
}
