using EmployeeControl.Domain.Entities;

namespace EmployeeControl.Domain.Interfaces;

public interface ICompany
{
    string CompanyId { get; set; }

    Company Company { get; set; }
}
