using AutoMapper;
using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;

public record GetTimeControlByIdResponse(string Id, DateTimeOffset Start, DateTimeOffset Finish)
{
    internal class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TimeControl, GetTimeControlByIdResponse>();
        }
    }
}
