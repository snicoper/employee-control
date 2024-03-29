using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksPaginated;

public record GetCompanyTasksPaginatedResponse(
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
            CreateMap<CompanyTask, GetCompanyTasksPaginatedResponse>();
        }
    }
}
