using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;

public class GetDepartmentByIdValidator : AbstractValidator<GetDepartmentByIdQuery>
{
    public GetDepartmentByIdValidator()
    {
        RuleFor(r => r.DepartmentId)
            .NotEmpty();
    }
}
