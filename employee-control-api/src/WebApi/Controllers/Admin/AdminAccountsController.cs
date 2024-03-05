using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.Admin.AdminAccounts.Queries.GetAdminAccountsPaginated;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers.Admin;

[Route("api/v{version:apiVersion}/admin/accounts")]
public class AdminAccountsController : ApiControllerBase
{
    /// <summary>
    /// Obtener lista de usuarios paginados.
    /// </summary>
    /// <param name="request">Datos de paginación.</param>
    /// <returns>Lista de usuarios paginados.</returns>
    [HttpGet("paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ResponseData<GetAdminAccountsPaginatedResponse>>> GetAdminAccountsPaginated(
        [FromQuery] RequestData request)
    {
        var result = await Sender.Send(new GetAdminAccountsPaginatedQuery(request));

        return result;
    }
}
