using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Accounts.Commands.RecoveryPasswordChange;

public record RecoveryPasswordChangeCommand(string UserId, string Code, string Password, string ConfirmPassword)
    : IRequest<Result>;
