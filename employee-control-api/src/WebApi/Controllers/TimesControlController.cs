using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.TimesControl.Commands.CreateIncidence;
using EmployeeControl.Application.Features.TimesControl.Commands.CreateTimeControl;
using EmployeeControl.Application.Features.TimesControl.Commands.DeleteTimeControl;
using EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControl;
using EmployeeControl.Application.Features.TimesControl.Commands.FinishTimeControlByStaff;
using EmployeeControl.Application.Features.TimesControl.Commands.StartTimeControl;
using EmployeeControl.Application.Features.TimesControl.Commands.UpdateTimeControl;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlById;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlRangeByEmployeeId;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimeControlWithEmployeeById;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByEmployeeIdPaginated;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimesControlByRangePaginated;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateByEmployeeId;
using EmployeeControl.Application.Features.TimesControl.Queries.GetTimeStateOpenByEmployeeId;
using EmployeeControl.Domain.Constants;
using EmployeeControl.Domain.Entities;
using EmployeeControl.Domain.Enums;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/times-control")]
public class TimesControlController : ApiControllerBase
{
    /// <summary>
    /// Obtener registros de <see cref="TimeControl" /> paginados en un rango de tiempo.
    /// <para>El <see cref="TimeControl" /> se obtiene con información del empleado.</para>
    /// </summary>
    /// <param name="from">Inicio del rango.</param>
    /// <param name="to">Final del rango.</param>
    /// <param name="requestData"><see cref="ResponseData{TResponse}" />.</param>
    /// <returns><see cref="ResponseData{TResponse}" /> con los filtros aplicados.</returns>
    [HttpGet("from/{from}/to/{to}/paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ResponseData<GetTimesControlByRangePaginatedResponse>>>
        GetTimesControlByRangePaginated(DateTimeOffset from, DateTimeOffset to, [FromQuery] RequestData requestData)
    {
        var result = await Sender.Send(new GetTimesControlByRangePaginatedQuery(from, to, requestData));

        return result;
    }

    /// <summary>
    /// Obtener registros de <see cref="TimeControl" /> por el Id de un <see cref="ApplicationUser" />.
    /// <para>El <see cref="TimeControl" /> se obtiene con información del empleado.</para>
    /// </summary>
    /// <param name="employeeId">Id empleado.</param>
    /// <param name="from">Filtro: inicio de rango.</param>
    /// <param name="to">Filtro: final del rango.</param>
    /// <param name="requestData"><see cref="ResponseData{TResponse}" />.</param>
    /// <returns><see cref="ResponseData{TResponse}" /> con los filtros aplicados.</returns>
    [HttpGet("employees/{employeeId}/from/{from}/to/{to}/paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ResponseData<GetTimesControlByEmployeeIdPaginatedResponse>>>
        GetTimesControlByEmployeeIdPaginated(
            string employeeId,
            DateTimeOffset from,
            DateTimeOffset to,
            [FromQuery] RequestData requestData)
    {
        var result = await Sender.Send(new GetTimesControlByEmployeeIdPaginatedQuery(employeeId, from, to, requestData));

        return result;
    }

    /// <summary>
    /// Obtener un <see cref="TimeControl" /> por su Id.
    /// </summary>
    /// <param name="id">Id del <see cref="TimeControl" />.</param>
    /// <returns><see cref="TimeControl" />.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetTimeControlByIdResponse>> GetTimeControlById(string id)
    {
        var result = await Sender.Send(new GetTimeControlByIdQuery(id));

        return result;
    }

    /// <summary>
    /// Obtener un <see cref="TimeControl" /> por su Id.
    /// <para>Contiene datos de <see cref="ApplicationUser" />.</para>
    /// </summary>
    /// <param name="id">Id del <see cref="TimeControl" />.</param>
    /// <returns><see cref="TimeControl" />.</returns>
    [HttpGet("{id}/employees")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetTimeControlWithEmployeeByIdResponse>> GetTimeControlWithEmployeeById(string id)
    {
        var result = await Sender.Send(new GetTimeControlWithEmployeeByIdQuery(id));

        return result;
    }

    /// <summary>
    /// Obtener una lista de <see cref="TimeControl" /> de un empleado concreto
    /// en un rango de fechas.
    /// </summary>
    /// <param name="employeeId">Id empleado a comprobar.</param>
    /// <param name="from">Fecha inicial.</param>
    /// <param name="to">Fecha final.</param>
    /// <returns>IsOpen, true si tiene abierto un tiempo, false en caso contrario.</returns>
    [HttpGet("employees/{employeeId}/from/{from}/to/{to}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ICollection<GetTimeControlRangeByEmployeeIdResponse>>>
        GetTimeControlRangeByEmployeeId(string employeeId, DateTimeOffset from, DateTimeOffset to)
    {
        var result = await Sender.Send(new GetTimeControlRangeByEmployeeIdQuery(employeeId, from, to));

        return result.ToList();
    }

    /// <summary>
    /// Obtener el estado actual de un empleado por su Id.
    /// <para>Si tiene inicializado un <see cref="TimeControl" />, el estado es true.</para>
    /// </summary>
    /// <param name="employeeId">Id empleado.</param>
    /// <returns>IsOpen, true si tiene abierto un tiempo, false en caso contrario.</returns>
    [HttpGet("employees/{employeeId}/time-state")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetTimeStateByEmployeeIdResponse>> GetTimeStateByEmployeeId(string employeeId)
    {
        var result = await Sender.Send(new GetTimeStateByEmployeeIdQuery(employeeId));

        return result;
    }

    /// <summary>
    /// Obtener un <see cref="TimeControl" /> abierto por el Id de empleado.
    /// <para>
    /// Si no tiene abierto un <see cref="TimeControl" />, el valor de <see cref="TimeControl.TimeState" /> será
    /// <see cref="TimeState.Close" /> y el tiempo de <see cref="TimeControl.Start" /> null.
    /// </para>
    /// </summary>
    /// <param name="employeeId">Id empleado.</param>
    /// <returns>El estado de <see cref="TimeControl.TimeState" /> y <see cref="TimeControl.Start" />.</returns>
    [HttpGet("employees/{employeeId}/time-state-open")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<GetTimeStateOpenByEmployeeIdResponse>> GetTimeStateOpenByEmployeeId(string employeeId)
    {
        var result = await Sender.Send(new GetTimeStateOpenByEmployeeIdQuery(employeeId));

        return result;
    }

    /// <summary>
    /// Crear un <see cref="TimeControl" /> con hora de inicio y final de un empleado concreto.
    /// </summary>
    /// <returns>Id del <see cref="TimeControl" /> creado.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> CreateTimeControl(CreateTimeControlCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Inicializa un <see cref="TimeControl" />.
    /// </summary>
    /// <param name="command">Employee Id.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPost("start")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> StartTimeControl(StartTimeControlCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Actualiza un <see cref="TimeControl" />.
    /// <para>Solo actualiza el Start y Finish.</para>
    /// </summary>
    /// <param name="command">Datos del <see cref="TimeControl" />.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> UpdateTimeControl(UpdateTimeControlCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Finalizar un <see cref="TimeControl" />.
    /// </summary>
    /// <param name="command">Datos para finalizar el <see cref="TimeControl" />.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPut("finish")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> FinishTimeControl(FinishTimeControlCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Finalizar un <see cref="TimeControl" /> por un role mínimo de <see cref="Roles.HumanResources" />.
    /// </summary>
    /// <param name="command">Employee Id.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPut("finish/staff")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> FinishTimeControlByStaff(FinishTimeControlByStaffCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Crea una incidencia en un <see cref="TimeControl" />.
    /// </summary>
    /// <param name="command">Employee Id.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpPut("{id}/create-incidence")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> CreateIncidence(CreateIncidenceCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Eliminar un <see cref="TimeControl" />.
    /// </summary>
    /// <param name="id">Id del <see cref="TimeControl" /> a eliminar.</param>
    /// <returns>Result con el estado del proceso.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> DeleteTimeControl(string id)
    {
        var result = await Sender.Send(new DeleteTimeControlCommand(id));

        return result;
    }
}
