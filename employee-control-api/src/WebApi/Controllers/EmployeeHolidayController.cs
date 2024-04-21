using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/employee-holidays")]
public class EmployeeHolidayController : ApiControllerBase
{
    /// <summary>
    /// Obtener lista de <see cref="EmployeeHoliday" /> paginados de un año concreto.
    /// </summary>
    /// <param name="request">RequestData.</param>
    /// <param name="year">Año a obtener <see cref="EmployeeHoliday" />.</param>
    /// <returns>Lista de <see cref="EmployeeHoliday" /> paginádos.</returns>
    [HttpGet("year/{year}/paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>>> GetEmployeeHolidaysByYearPaginated(
        [FromQuery] RequestData request,
        int year)
    {
        var result = await Sender.Send(new GetEmployeeHolidaysByYearPaginatedQuery(year, request));

        return result;
    }
}
