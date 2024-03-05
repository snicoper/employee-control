using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.CompanySettings.Commands.UpdateCompanySettings;
using EmployeeControl.Application.Features.CompanySettings.Queries.GetCompanySettingsByCompanyId;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/company-settings")]
public class CompanySettingsController : ApiControllerBase
{
    /// <summary>
    /// Obtener <see cref="CompanySettings" /> por el Id de la compañía. />.
    /// </summary>
    /// <param name="companyId">Id compañía.</param>
    /// <returns><see cref="GetCompanySettingsByCompanyIdResponse" />.</returns>
    [HttpGet("companies/{companyId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<GetCompanySettingsByCompanyIdResponse> GetCompanySettingsByCompanyId(string companyId)
    {
        var result = await Sender.Send(new GetCompanySettingsByCompanyIdQuery(companyId));

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
