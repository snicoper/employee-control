using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.CompanyCalendars.Commands.CreateCompanyCalendar;
using EmployeeControl.Application.Features.CompanyCalendars.Commands.SetDefaultCalendar;
using EmployeeControl.Application.Features.CompanyCalendars.Commands.UpdateCompanyCalendar;
using EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendarById;
using EmployeeControl.Application.Features.CompanyCalendars.Queries.GetCompanyCalendars;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/company-calendars")]
public class CompanyCalendarController : ApiControllerBase
{
    /// <summary>
    /// Obtener lista de <see cref="CompanyCalendar" />.
    /// </summary>
    /// <returns>Lista de <see cref="CompanyCalendar" />.</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ICollection<GetCompanyCalendarsResponse>>> GetCompanyCalendars()
    {
        var result = await Sender.Send(new GetCompanyCalendarsQuery());

        return result.ToList();
    }

    /// <summary>
    /// Obtener un <see cref="CompanyCalendar" /> por su Id.
    /// </summary>
    /// <returns><see cref="CompanyCalendar" />.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetCompanyCalendarByIdResponse>> GetCompanyCalendarById(string id)
    {
        var result = await Sender.Send(new GetCompanyCalendarByIdQuery(id));

        return result;
    }

    /// <summary>
    /// Crea un <see cref="CompanyCalendar" />.
    /// </summary>
    /// <param name="command">Datos de <see cref="CompanyCalendar" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> CreateCompanyCalendar(CreateCompanyCalendarCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Actualizar un <see cref="CompanyCalendar" />.
    /// </summary>
    /// <param name="command">Datos actualizados de <see cref="CompanyCalendar" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> UpdateCompanyCalendar(UpdateCompanyCalendarCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Establecer un <see cref="CompanyCalendar" /> como default por su Id.
    /// </summary>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("{id}/default")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> SetDefaultCalendar(string id)
    {
        var result = await Sender.Send(new SetDefaultCalendarCommand(id));

        return result;
    }
}
