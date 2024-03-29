using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsPaginated;

public record GetDepartmentsPaginatedResponse(string Id, string Name, bool Active, string Background, string Color)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Department, GetDepartmentsPaginatedResponse>();
        }
    }
}
