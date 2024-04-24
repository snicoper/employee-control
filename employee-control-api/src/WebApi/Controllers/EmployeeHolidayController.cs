using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearAndEmployeeId;
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

    /// <summary>
    /// Obtener días de vacaciones de un año y empleado concreto .
    /// </summary>
    /// <param name="year">Año de días de vacaciones.</param>
    /// <param name="employeeId">Id del empleado.</param>
    /// <returns>Datos de <see cref="EmployeeHoliday" />.</returns>
    [HttpGet("year/{year}/employees/{employeeId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetEmployeeHolidaysByYearAndEmployeeIdResponse>> GetEmployeeHolidaysByYearAndEmployeeId(
        int year,
        string employeeId)
    {
        var result = await Sender.Send(new GetEmployeeHolidaysByYearAndEmployeeIdQuery(year, employeeId));

        return result;
    }
}
