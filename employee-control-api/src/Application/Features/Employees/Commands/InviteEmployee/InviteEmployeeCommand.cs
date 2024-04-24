using AutoMapper;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.InviteEmployee;

[Authorize(Roles = Roles.HumanResources)]
public record InviteEmployeeCommand(string FirstName, string LastName, string Email, string TimeZone)
    : IRequest<string>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<InviteEmployeeCommand, ApplicationUser>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email));
        }
    }
}
