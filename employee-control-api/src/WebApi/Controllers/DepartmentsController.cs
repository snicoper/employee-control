using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Features.Departments.Commands.ActivateDepartment;
using EmployeeControl.Application.Features.Departments.Commands.AssignEmployeesToDepartment;
using EmployeeControl.Application.Features.Departments.Commands.CreateDepartment;
using EmployeeControl.Application.Features.Departments.Commands.DeactivateDepartment;
using EmployeeControl.Application.Features.Departments.Commands.UpdateDepartment;
using EmployeeControl.Application.Features.Departments.Queries.GetDepartmentById;
using EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByEmployeeIdPaginated;
using EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsPaginated;
using EmployeeControl.Application.Features.Departments.Queries.GetEmployeesByDepartmentIdPaginated;
using EmployeeControl.Application.Features.Departments.Queries.GetEmployeesUnassignedDepartmentByDepartmentId;
using EmployeeControl.Domain.Entities;
using EmployeeControl.WebApi.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeControl.WebApi.Controllers;

[Route("api/v{version:apiVersion}/departments")]
public class DepartmentsController : ApiControllerBase
{
    /// <summary>
    /// Obtener lista de departamentos paginados.
    /// </summary>
    /// <param name="request">RequestData.</param>
    /// <returns>Lista de departamentos paginádos.</returns>
    [HttpGet("paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ResponseData<GetDepartmentsPaginatedResponse>>> GetDepartmentsPaginated(
        [FromQuery] RequestData request)
    {
        var result = await Sender.Send(new GetDepartmentsPaginatedQuery(request));

        return result;
    }

    /// <summary>
    /// Obtener lista paginada de <see cref="ApplicationUser" /> por el Id del <see cref="Department" />.
    /// </summary>
    /// <param name="request"><see cref="RequestData" />.</param>
    /// <param name="id">Id del <see cref="Department" />.</param>
    /// <returns>Lista de usuarios paginádos.</returns>
    [HttpGet("{id}/employees/paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ResponseData<GetEmployeesByDepartmentIdPaginatedResponse>>>
        GetEmployeesByDepartmentIdPaginated([FromQuery] RequestData request, string id)
    {
        var result = await Sender.Send(new GetEmployeesByDepartmentIdPaginatedQuery(id, request));

        return result;
    }

    /// <summary>
    /// Obtener lista paginada de <see cref="Department" /> por el Id de <see cref="ApplicationUser" />.
    /// </summary>
    /// <param name="request"><see cref="RequestData" />.</param>
    /// <param name="employeeId">Id del <see cref="Department" />.</param>
    /// <returns>Lista de usuarios paginádos.</returns>
    [HttpGet("employees/{employeeId}/paginated")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>>>
        GetDepartmentsByEmployeeIdPaginated([FromQuery] RequestData request, string employeeId)
    {
        var result = await Sender.Send(new GetDepartmentsByEmployeeIdPaginatedQuery(employeeId, request));

        return result;
    }

    /// <summary>
    /// Obtener lista de todos los empleados que no tengan asignada un departamento concreta.
    /// </summary>
    /// <param name="id">Id departamento.</param>
    /// <returns>Lista empleados que no pertenecen a un departamento concreta.</returns>
    [HttpGet("{id}/employees/unassigned")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ICollection<GetEmployeesUnassignedDepartmentByDepartmentIdResponse>>
        GetEmployeesUnassignedDepartmentByDepartmentId(string id)
    {
        var result = await Sender.Send(new GetEmployeesUnassignedDepartmentByDepartmentIdQuery(id));

        return result;
    }

    /// <summary>
    /// Obtener un <see cref="Department" /> por su Id.
    /// </summary>
    /// <param name="id">Id del departamento.</param>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<GetDepartmentByIdResponse>> GetDepartmentById(string id)
    {
        var result = await Sender.Send(new GetDepartmentByIdQuery(id));

        return result;
    }

    /// <summary>
    /// Crear un nuevo <see cref="Department" />.
    /// </summary>
    /// <param name="command">Datos del <see cref="Department" />.</param>
    /// <returns>Id del departamento creado en caso de éxito.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CreateDepartmentResponse>> CreateDepartment(CreateDepartmentCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Asignar empleados a un <see cref="Department" /> concreto.
    /// </summary>
    /// <param name="command">Lista de Ids de empleado a asignar y la Id del departamento.</param>
    [HttpPost("{id}/employees/assign")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result>> AssignEmployeesToDepartment(AssignEmployeesToDepartmentCommand command)
    {
        var result = await Sender.Send(command);

        return ObjectResultWithStatusCode(result, StatusCodes.Status201Created);
    }

    /// <summary>
    /// Actualiza un <see cref="Department" />.
    /// </summary>
    /// <param name="command">Datos del <see cref="Department" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> UpdateDepartment(UpdateDepartmentCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Activa un <see cref="Department" />.
    /// </summary>
    /// <param name="command">Id del <see cref="Department" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("activate")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> ActivateDepartment(ActivateDepartmentCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }

    /// <summary>
    /// Desactiva un <see cref="Department" />.
    /// </summary>
    /// <param name="command">Id del <see cref="Department" />.</param>
    /// <returns><see cref="Result" />.</returns>
    [HttpPut("deactivate")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result>> DeactivateDepartment(DeactivateDepartmentCommand command)
    {
        var result = await Sender.Send(command);

        return result;
    }
}
