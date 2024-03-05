using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksByEmployeeIdPaginated;

public record GetCompanyTasksByEmployeeIdPaginatedResponse(string Id, string Name, bool Active, string Background, string Color)
{
    internal class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CompanyTask, GetCompanyTasksByEmployeeIdPaginatedResponse>();
        }
    }
}
