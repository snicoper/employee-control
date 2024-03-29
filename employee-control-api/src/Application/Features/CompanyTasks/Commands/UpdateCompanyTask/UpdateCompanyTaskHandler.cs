using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.UpdateCompanyTask;

internal class UpdateCompanyTaskHandler(IApplicationDbContext context, ICompanyTaskService companyTaskService, IMapper mapper)
    : IRequestHandler<UpdateCompanyTaskCommand, Result>
{
    public async Task<Result> Handle(UpdateCompanyTaskCommand request, CancellationToken cancellationToken)
    {
        var companyTask = await companyTaskService.GetByIdAsync(request.Id, cancellationToken);
        var updatedCompanyTask = mapper.Map(request, companyTask);

        context.CompanyTasks.Update(updatedCompanyTask);
        await context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
