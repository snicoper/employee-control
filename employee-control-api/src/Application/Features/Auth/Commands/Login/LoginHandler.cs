using EmployeeControl.Application.Common.Interfaces.Features.Identity;
using MediatR;

namespace EmployeeControl.Application.Features.Auth.Commands.Login;

internal class LoginHandler(IAuthService authService) : IRequestHandler<LoginCommand, LoginResponse>
{
    public async Task<LoginResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var result = await authService.LoginAsync(request.Email, request.Password);
        var resultResponse = new LoginResponse(result.AccessToken, result.RefreshToken);

        return resultResponse;
    }
}
