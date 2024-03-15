using EmployeeControl.Application.Features.WorkDays.Queries.GetWorkDaysByCompanyId;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/work-days")]
public class WorkDaysController : ApiControllerBase
{
    /// <summary>
    /// Obtener un <see cref="WorkDays" /> por su Id.
    /// </summary>
    /// <param name="companyId">Id del <see cref="WorkDays" /> a obtener.</param>
    /// <returns><see cref="WorkDays" />.</returns>
    [HttpGet("company/{companyId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetWorkDaysByCompanyIdResponse>> GetWorkDaysByCompanyId(string companyId)
    {
        var result = await Sender.Send(new GetWorkDaysByCompanyIdQuery(companyId));

        return result;
    }
}
