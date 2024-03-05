using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Accounts.Commands.RecoveryPassword;

public record RecoveryPasswordCommand(string Email) : IRequest<Result>;
