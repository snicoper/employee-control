using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.Accounts.Commands.RecoveryPassword;
using EmployeeControl.Application.Features.Accounts.Commands.RecoveryPasswordChange;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/accounts")]
public class AccountsController : ApiControllerBase
{
    /// <summary>
    /// Recordar contraseña, envía un email para restablecer una nueva contraseña.
    /// </summary>
    /// <param name="command">Datos del UserId del usuario a validar.</param>
    /// <returns>Result.</returns>
    [AllowAnonymous]
    [HttpPost("recovery-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> RecoveryPassword(RecoveryPasswordCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Restablece una contraseña olvidada.
    /// </summary>
    /// <param name="command">Datos para restablecer la contraseña.</param>
    /// <returns>Result.</returns>
    [AllowAnonymous]
    [HttpPost("recovery-password-change")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> RecoveryPasswordChange(RecoveryPasswordChangeCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }
}
