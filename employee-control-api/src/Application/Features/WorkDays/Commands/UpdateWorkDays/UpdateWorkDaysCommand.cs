using AutoMapper;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.WorkDays.Commands.UpdateWorkDays;

public record UpdateWorkDaysCommand(
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
            CreateMap<UpdateWorkDaysCommand, Domain.Entities.WorkDays>();
        }
    }
}
