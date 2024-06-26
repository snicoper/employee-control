﻿using EmployeeControl.Application.Common.Models;
using EmployeeControl.Application.Common.Security;
using EmployeeControl.Domain.Constants;
using MediatR;

namespace EmployeeControl.Application.Features.CompanyTasks.Queries.GetCompanyTasksPaginated;

[Authorize(Roles = Roles.HumanResources)]
public record GetCompanyTasksPaginatedQuery(RequestData RequestData)
    : IRequest<ResponseData<GetCompanyTasksPaginatedResponse>>;
