using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsenceByCompanyIdPaginated;

public record GetCategoryAbsenceByCompanyIdPaginatedResponse(
    string Id,
    string Description,
    string Background,
    string Color,
    bool Active)
{
    internal class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<CategoryAbsence, GetCategoryAbsenceByCompanyIdPaginatedResponse>();
        }
    }
}
