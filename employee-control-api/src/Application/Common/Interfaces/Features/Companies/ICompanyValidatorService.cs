namespace EmployeeControl.Application.Common.Interfaces.Features.Companies;

public interface ICompanyValidatorService
{
    Task UniqueNameValidationAsync(string company, CancellationToken cancellationToken);
}
