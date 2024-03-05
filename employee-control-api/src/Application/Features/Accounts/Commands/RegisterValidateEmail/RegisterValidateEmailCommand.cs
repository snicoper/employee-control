using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Accounts.Commands.RegisterValidateEmail;

public record RegisterValidateEmailCommand(string Code, string UserId) : IRequest<Result>;
