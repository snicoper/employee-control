using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using MediatR;

namespace EmployeeControl.Application.Features.Auth.Commands.RefreshToken;

internal class RefreshTokenHandler(IAuthService authService) : IRequestHandler<RefreshTokenCommand, RefreshTokenResponse>
{
    public async Task<RefreshTokenResponse> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var result = await authService.RefreshTokenAsync(request.RefreshToken);
        var resultResponse = new RefreshTokenResponse(result.AccessToken, result.RefreshToken);

        return resultResponse;
    }
}
