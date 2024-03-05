using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Features.Departments;
using EmployeeControl.Domain.Entities;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Commands.CreateDepartment;

internal class CreateDepartmentHandler(IDepartmentService departmentService, IMapper mapper)
    : IRequestHandler<CreateDepartmentCommand, CreateDepartmentResponse>
{
    public async Task<CreateDepartmentResponse> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var department = mapper.Map<Department>(request);
        department.Active = true;

        department = await departmentService.CreateAsync(department, cancellationToken);

        var resultResponse = new CreateDepartmentResponse(department.Id);

        return resultResponse;
    }
}
