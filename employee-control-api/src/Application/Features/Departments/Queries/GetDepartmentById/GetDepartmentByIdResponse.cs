using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;

public record GetDepartmentByIdResponse(string Id, string Name, bool Active, string Background, string Color)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Department, GetDepartmentByIdResponse>();
        }
    }
}
