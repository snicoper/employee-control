using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Accounts.Commands.ResendEmailValidation;

public record ResendEmailValidationCommand(string UserId) : IRequest<Result>;
