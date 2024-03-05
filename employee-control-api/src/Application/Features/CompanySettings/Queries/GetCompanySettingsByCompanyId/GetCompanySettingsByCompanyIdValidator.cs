using FluentValidation;

namespace EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettingsByCompanyId;

public class GetCompanySettingsByCompanyIdValidator : AbstractValidator<GetCompanySettingsByCompanyIdQuery>
{
    public GetCompanySettingsByCompanyIdValidator()
    {
        RuleFor(r => r.CompanyId)
            .NotEmpty();
    }
}
