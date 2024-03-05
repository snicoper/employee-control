using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.CreateCompanyTask;

internal class CreateCompanyTaskHandler(
        ICurrentUserService currentUserService,
        ICompanyTaskService companyTaskService,
        IMapper mapper)
    : IRequestHandler<CreateCompanyTaskCommand, string>
{
    public async Task<string> Handle(CreateCompanyTaskCommand request, CancellationToken cancellationToken)
    {
        // Una tarea solo puede crearse para la propia compañía.
        if (currentUserService.CompanyId != request.CompanyId)
        {
            throw new UnauthorizedAccessException();
        }

        var newCompanyTask = mapper.Map<CreateCompanyTaskCommand, CompanyTask>(request);
        var companyTask = await companyTaskService.CreateAsync(newCompanyTask, cancellationToken);

        return companyTask.Id;
    }
}
