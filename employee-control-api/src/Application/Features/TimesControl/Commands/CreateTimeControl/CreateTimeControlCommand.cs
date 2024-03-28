using AutoMapper;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using MediatR;

namespace EmployeeControl.Application.Features.TimesControl.Commands.CreateTimeControl;

[Authorize(Roles = Roles.HumanResources)]
public record CreateTimeControlCommand(
    string UserId,
    DateTimeOffset Start,
    DateTimeOffset Finish,
    DeviceType DeviceType,
    TimeState TimeState)
    : IRequest<string>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<CreateTimeControlCommand, TimeControl>();
        }
    }
}
