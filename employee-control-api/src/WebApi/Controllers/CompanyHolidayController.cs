using EmployeeControl.Application.Features.CompanyHolidays.Command.CreateCompanyHoliday;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/company-holidays")]
public class CompanyHolidayController : ApiControllerBase
{
    /// <summary>
    /// Crear un nuevo <see cref="CompanyHoliday" />.
    /// </summary>
    /// <param name="command">Datos del <see cref="CompanyHoliday" />.</param>
    /// <returns>Id del <see cref="CompanyHoliday" />. creado en caso de éxito.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CreateCompanyHolidayResponse>> CreateCompanyHoliday(CreateCompanyHolidayCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result.CompanyHolidayId, StatusCodes.Status201Created);
    }
}
