using AutoMapper;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Employees.Commands.UpdateEmployeeSettings;

public record UpdateEmployeeSettingsCommand(string Id, string UserId, string Timezone) : IRequest<EmployeeSettings>
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<UpdateEmployeeSettingsCommand, EmployeeSettings>();
        }
    }
}
