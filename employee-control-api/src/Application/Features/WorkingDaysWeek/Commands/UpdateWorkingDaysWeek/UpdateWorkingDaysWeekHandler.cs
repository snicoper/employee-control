using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.WorkingDaysWeek;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.WorkingDaysWeek.Commands.UpdateWorkingDaysWeek;

internal class UpdateWorkingDaysWeekHandler(IWorkingDaysWeekService workingDaysWeekService, IMapper mapper)
    : IRequestHandler<UpdateWorkingDaysWeekCommand, Result>
{
    public async Task<Result> Handle(UpdateWorkingDaysWeekCommand request, CancellationToken cancellationToken)
    {
        var workingDaysWeek = await workingDaysWeekService.GetWorkingDaysWeekAsync(cancellationToken);
        workingDaysWeek = mapper.Map(request, workingDaysWeek);

        await workingDaysWeekService.UpdateAsync(workingDaysWeek, cancellationToken);

        return Result.Success();
    }
}
