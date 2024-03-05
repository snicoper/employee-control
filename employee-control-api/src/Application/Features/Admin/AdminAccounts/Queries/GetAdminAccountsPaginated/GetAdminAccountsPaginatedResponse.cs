using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.Admin.AdminAccounts.Queries.GetAdminAccountsPaginated;

public record GetAdminAccountsPaginatedResponse(string Id, string FirstName, string LastName, string Email)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ApplicationUser, GetAdminAccountsPaginatedResponse>();
        }
    }
}
