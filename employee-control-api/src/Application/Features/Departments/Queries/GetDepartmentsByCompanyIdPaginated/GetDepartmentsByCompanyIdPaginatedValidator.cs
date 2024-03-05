using FluentValidation;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByCompanyIdPaginated;

public class GetDepartmentsByCompanyIdPaginatedValidator : AbstractValidator<GetDepartmentsByCompanyIdPaginatedQuery>
{
    public GetDepartmentsByCompanyIdPaginatedValidator()
    {
        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
