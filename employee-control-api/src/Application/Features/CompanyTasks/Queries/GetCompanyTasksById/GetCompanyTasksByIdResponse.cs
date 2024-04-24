using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksById;

public record GetCompanyTasksByIdResponse(
    string Id,
    string Name,
    string Background,
    string Color,
    bool Active,
    DateTimeOffset Created)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CompanyTask, GetCompanyTasksByIdResponse>();
        }
    }
}
