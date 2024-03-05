using MediatR;

namespace EmployeeControl.Application.Features.Accounts.Commands.RegisterAccount;

public record RegisterAccountCommand(
        string FirstName,
        string LastName,
        string Email,
        string Password,
        string ConfirmPassword,
        string CompanyName,
        string Timezone)
    : IRequest<string>;
