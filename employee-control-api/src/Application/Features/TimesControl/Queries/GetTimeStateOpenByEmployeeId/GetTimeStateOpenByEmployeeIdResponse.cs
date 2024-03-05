using EmployeeControl.Domain.Enums;

namespace EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateOpenByEmployeeId;

public record GetTimeStateOpenByEmployeeIdResponse(DateTimeOffset Start, TimeState TimeState);
