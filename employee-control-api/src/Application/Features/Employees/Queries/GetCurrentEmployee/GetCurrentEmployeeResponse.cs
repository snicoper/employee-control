using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.Employees.Queries.GetCurrentEmployee;

public record GetCurrentEmployeeResponse(
    string Id,
    string FirstName,
    string LastName,
    string Email,
    string CompanyId,
    string CompanyCalendarId)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<ApplicationUser, GetCurrentEmployeeResponse>();
        }
    }
}
