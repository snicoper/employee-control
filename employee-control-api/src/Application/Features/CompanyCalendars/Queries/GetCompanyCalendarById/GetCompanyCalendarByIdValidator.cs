using FluentValidation;

namespace EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendarById;

public class GetCompanyCalendarByIdValidator : AbstractValidator<GetCompanyCalendarByIdQuery>
{
    public GetCompanyCalendarByIdValidator()
    {
        RuleFor(r => r.Id)
            .NotEmpty();
    }
}
