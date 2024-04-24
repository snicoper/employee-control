using MediatR;

namespace EmployeeControl.Application.Features.Auth.Commands.RefreshToken;

public record RefreshTokenCommand(string RefreshToken)
    : IRequest<RefreshTokenResponse>;
