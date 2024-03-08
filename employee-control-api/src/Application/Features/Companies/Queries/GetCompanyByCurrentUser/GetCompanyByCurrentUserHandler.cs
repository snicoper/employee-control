using EmployeeControl.Application.Common.Interfaces.Common;
using EmployeeControl.Application.Common.Interfaces.Features.Companies;
using MediatR;

namespace EmployeeControl.Application.Features.Companies.Queries.GetCompanyByCurrentUser;

internal class GetCompanyByCurrentUserHandler(ICompanyService companyService, ICurrentUserService currentUserService)
    : IRequestHandler<GetCompanyByCurrentUserQuery, GetCompanyByCurrentUserResponse>
{
    public async Task<GetCompanyByCurrentUserResponse> Handle(
        GetCompanyByCurrentUserQuery request,
        CancellationToken cancellationToken)
    {
        var company = await companyService.GetByIdAsync(currentUserService.CompanyId, cancellationToken);
        var result = new GetCompanyByCurrentUserResponse(company.Id, company.Name);

        return result;
    }
}
