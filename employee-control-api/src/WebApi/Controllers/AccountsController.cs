using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.Accounts.Commands.RecoveryPassword;
using EmployeeControl.Application.Features.Accounts.Commands.RecoveryPasswordChange;
using EmployeeControl.Application.Features.Accounts.Commands.RegisterAccount;
using EmployeeControl.Application.Features.Accounts.Commands.RegisterValidateEmail;
using EmployeeControl.Application.Features.Accounts.Commands.ResendEmailValidation;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/accounts")]
public class AccountsController : ApiControllerBase
{
    /// <summary>
    /// Creación de una cuenta por el usuario.
    /// </summary>
    /// <param name="command">Datos del usuario.</param>
    /// <returns>Id del usuario creado en caso de éxito.</returns>
    [AllowAnonymous]
    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> RegisterAccount(RegisterAccountCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Validación de email para una cuenta creada de cero.
    /// </summary>
    /// <param name="command">Datos del Code y UserId del usuario a validar.</param>
    /// <returns>Result.</returns>
    [AllowAnonymous]
    [HttpPost("validate-email")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> RegisterValidateEmail(RegisterValidateEmailCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Re-envía una validación de email para una cuenta creada.
    /// </summary>
    /// <param name="command">Datos del UserId del usuario a validar.</param>
    /// <returns>Result.</returns>
    [AllowAnonymous]
    [HttpPost("resend-email-validation")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> ResendEmailValidation(ResendEmailValidationCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

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
