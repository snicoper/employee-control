using AutoMapper;
using EmployeeControl.Application.Common.Models;
using EmployeeControl.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Features.EmployeeHolidays.Queries.GetEmployeeHolidaysByYearPaginated;

internal class GetEmployeeHolidaysByYearPaginatedHandler(
    UserManager<ApplicationUser> userManager,
    IMapper mapper)
    : IRequestHandler<GetEmployeeHolidaysByYearPaginatedQuery, ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>>
{
    public async Task<ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>> Handle(
        GetEmployeeHolidaysByYearPaginatedQuery request,
        CancellationToken cancellationToken)
    {
        // Obtener empleados con el EmployeeHoliday en base a request.Year.
        // Un empleado solo puede tener un EmployeeHoliday del mismo año.
        var employees = userManager
            .Users
            .Include(au => au.EmployeeHolidays.Where(eh => eh.Year == request.Year))
            .Where(au => au.Active);

        // El mapeo se hace como si fuese una entidad EmployeeHoliday en vez de ApplicationUser.
        var resultResponse = await ResponseData<GetEmployeeHolidaysByYearPaginatedResponse>.CreateAsync(
            employees,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
