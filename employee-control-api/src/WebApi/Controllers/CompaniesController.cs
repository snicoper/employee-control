using EmployeeControl.Application.Features.Companies.Queries.GetCompanyByCurrentUser;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/companies")]
public class CompaniesController : ApiControllerBase
{
    /// <summary>
    /// Obtener compañía del usuario activo.
    /// </summary>
    [HttpGet("current-user")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetCompanyByCurrentUserResponse>> GetCompanyByCurrentUser()
    {
        var result = await Sender.Send(new GetCompanyByCurrentUserQuery());

        return result;
    }
}
