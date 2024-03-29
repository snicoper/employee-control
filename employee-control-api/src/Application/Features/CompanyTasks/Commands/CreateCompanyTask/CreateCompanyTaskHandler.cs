using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.CompanyTask;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Commands.CreateCompanyTask;

internal class CreateCompanyTaskHandler(ICompanyTaskService companyTaskService, IMapper mapper)
    : IRequestHandler<CreateCompanyTaskCommand, string>
{
    public async Task<string> Handle(CreateCompanyTaskCommand request, CancellationToken cancellationToken)
    {
        var newCompanyTask = mapper.Map<CreateCompanyTaskCommand, CompanyTask>(request);
        var companyTask = await companyTaskService.CreateAsync(newCompanyTask, cancellationToken);

        return companyTask.Id;
    }
}
