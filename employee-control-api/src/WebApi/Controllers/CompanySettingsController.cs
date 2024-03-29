using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.CompanySettings.Commands.UpdateCompanySettings;
using EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettings;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/company-settings")]
public class CompanySettingsController : ApiControllerBase
{
    /// <summary>
    /// Obtener <see cref="CompanySettings" /> de la compañía. />.
    /// </summary>
    /// <returns><see cref="GetCompanySettingsResponse" />.</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<GetCompanySettingsResponse> GetCompanySettings()
    {
        var result = await Sender.Send(new GetCompanySettingsQuery());

        return result;
    }

    /// <summary>
    /// Actualizar un <see cref="CompanySettings" />.
    /// </summary>
    /// <param name="command">Datos actualizados.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Result>> UpdateCompanySettings(UpdateCompanySettingsCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }
}
