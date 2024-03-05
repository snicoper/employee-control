namespace EmployeeControl.Application.Common.Interfaces.Common;

public interface ICurrentUserService
{
    string Id { get; }

    string CompanyId { get; }

    IEnumerable<string> Roles { get; }
}
