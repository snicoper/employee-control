using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksByCompanyIdPaginated;

public record GetCompanyTasksByCompanyIdPaginatedResponse(
    string Id,
    string Name,
    string CompanyId,
    bool Active,
    string Background,
    string Color,
    DateTimeOffset Created)
{
    internal class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CompanyTask, GetCompanyTasksByCompanyIdPaginatedResponse>();
        }
    }
}
