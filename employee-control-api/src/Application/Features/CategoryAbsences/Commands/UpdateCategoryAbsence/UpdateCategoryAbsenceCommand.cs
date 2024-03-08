using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Commands.UpdateCategoryAbsence;

[Authorize(Roles = Roles.HumanResources)]
public record UpdateCategoryAbsenceCommand(string Id, string Description, string Background, string Color, bool Active)
    : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateCategoryAbsenceCommand, CategoryAbsence>();
        }
    }
}
