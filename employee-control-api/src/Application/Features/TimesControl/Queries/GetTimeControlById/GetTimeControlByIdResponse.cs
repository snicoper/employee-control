using AutoMapper;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

public record GetTimeControlByIdResponse(
    string Id,
    string UserId,
    DateTimeOffset Start,
    DateTimeOffset Finish,
    ClosedBy ClosedBy,
    TimeState TimeState,
    DeviceType DeviceTypeStart,
    DeviceType? DeviceTypeFinish,
    double LatitudeStart,
    double LatitudeFinish)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TimeControl, GetTimeControlByIdResponse>();
        }
    }
}
