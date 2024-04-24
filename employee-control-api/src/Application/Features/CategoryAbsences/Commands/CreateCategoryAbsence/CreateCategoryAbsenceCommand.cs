using AutoMapper;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.CreateCategoryAbsence;

[Authorize(Roles = Roles.HumanResources)]
public record CreateCategoryAbsenceCommand(string Description, string Background, string Color)
    : IRequest<CategoryAbsence>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CreateCategoryAbsenceCommand, CategoryAbsence>();
        }
    }
}
