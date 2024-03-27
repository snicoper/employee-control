using AutoMapper;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Commands.UpdateWorkingDaysWeek;

public record UpdateWorkingDaysWeekCommand(
    string Id,
    bool Monday,
    bool Tuesday,
    bool Wednesday,
    bool Thursday,
    bool Friday,
    bool Saturday,
    bool Sunday,
    string CompanyId)
    : IRequest<Result>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateWorkingDaysWeekCommand, Domain.Entities.WorkingDaysWeek>();
        }
    }
}
