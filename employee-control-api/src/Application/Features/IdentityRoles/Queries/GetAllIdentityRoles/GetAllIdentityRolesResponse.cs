using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.IdentityRoles.Queries.GetAllIdentityRoles;

public record GetAllIdentityRolesResponse(string Id, string Name)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ApplicationRole, GetAllIdentityRolesResponse>();
        }
    }
}
