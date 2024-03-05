using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.Departments.Queries.GetDepartmentsByEmployeeIdPaginated;

public record GetDepartmentsByEmployeeIdPaginatedQuery(string EmployeeId, RequestData RequestData)
    : IRequest<ResponseData<GetDepartmentsByEmployeeIdPaginatedResponse>>;
