using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.CompanyHolidays.Command.CreateCompanyHoliday;
using EmployeeControl.Application.Features.CompanyHolidays.Command.DeleteCompanyHoliday;
using EmployeeControl.Application.Features.CompanyHolidays.Command.UpdateCompanyHoliday;
using EmployeeControl.Application.Features.CompanyHolidays.Queries.GetCompanyHolidaysByYear;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/company-holidays")]
public class CompanyHolidayController : ApiControllerBase
{
    /// <summary>
    /// Obtener lista de <see cref="CompanyHoliday" /> filtrado por año.
    /// </summary>
    /// <param name="year">Año al que obtener <see cref="CompanyHoliday" />.</param>
    /// <returns>Lista de departamentos paginádos.</returns>
    [HttpGet("year/{year}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<GetCompanyHolidaysByYearResponse>>> GetCompanyHolidaysByYear(int year)
    {
        var result = await Sender.Send(new GetCompanyHolidaysByYearQuery(year));

        return result;
    }

    /// <summary>
    /// Crear un nuevo <see cref="CompanyHoliday" />.
    /// </summary>
    /// <param name="command">Datos del <see cref="CompanyHoliday" />.</param>
    /// <returns>Id del <see cref="CompanyHoliday" />. creado en caso de éxito.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<string>> CreateCompanyHoliday(CreateCompanyHolidayCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Actualiza un <see cref="CompanyHoliday" />.
    /// </summary>
    /// <param name="command">Datos del <see cref="CompanyHoliday" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> UpdateCompanyHoliday(UpdateCompanyHolidayCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Elimina un <see cref="CompanyHoliday" />.
    /// </summary>
    /// <param name="id">Id <see cref="CompanyHoliday" /> a eliminar.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> DeleteCompanyHoliday(string id)
    {
        var result = await Sender.Send(new DeleteCompanyHolidayCommand(id));

        return result;
    }
}
