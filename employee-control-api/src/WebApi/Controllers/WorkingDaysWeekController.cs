using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.WorkingDaysWeek.Commands.UpdateWorkingDaysWeek;
using EmployeeControl.Application.Features.WorkingDaysWeek.Queries.GetWorkingDaysWeekByCompanyId;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/working-days-week")]
public class WorkingDaysWeekController : ApiControllerBase
{
    /// <summary>
    /// Obtener un <see cref="WorkingDaysWeek" /> por su Id.
    /// </summary>
    /// <param name="companyId">Id del <see cref="WorkingDaysWeek" /> a obtener.</param>
    /// <returns><see cref="WorkingDaysWeek" />.</returns>
    [HttpGet("company/{companyId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetWorkingDaysWeekByCompanyIdResponse>> GetWorkingDaysWeekByCompanyId(string companyId)
    {
        var result = await Sender.Send(new GetWorkingDaysWeekByCompanyIdQuery(companyId));

        return result;
    }

    /// <summary>
    /// Actualiza un <see cref="WorkingDaysWeek" />.
    /// </summary>
    /// <param name="weekCommand">Datos del <see cref="WorkingDaysWeek" />.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> UpdateWorkingDaysWeek(UpdateWorkingDaysWeekCommand weekCommand)
    {
        var result = await Sender.Send(weekCommand);

        return result;
    }
}
