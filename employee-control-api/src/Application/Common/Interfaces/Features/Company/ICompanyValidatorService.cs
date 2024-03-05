namespace EmployeeControl.Application.Common.Interfaces.Features.Company;

public interface ICompanyValidatorService
{
    Task UniqueNameValidationAsync(string company, CancellationToken cancellationToken);
}
