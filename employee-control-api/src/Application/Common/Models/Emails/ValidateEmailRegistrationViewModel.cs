namespace EmployeeControl.Application.Common.Models.Emails;

public record ValidateEmailRegistrationViewModel(string SiteName, string? Email, string CompanyName, string? Callback);
