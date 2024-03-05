using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetEmployeesByCompanyTaskIdPaginated;

public record GetEmployeesByCompanyTaskIdPaginatedResponse(string Id, string FirstName, string LastName, string Email)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ApplicationUser, GetEmployeesByCompanyTaskIdPaginatedResponse>();
        }
    }
}
