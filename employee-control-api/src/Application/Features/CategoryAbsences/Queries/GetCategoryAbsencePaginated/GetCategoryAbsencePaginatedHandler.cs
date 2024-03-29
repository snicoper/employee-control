using AutoMapper;
using EmployeeControl.Application.Common.Interfaces.Data;
using EmployeeControl.Application.Common.Models;
using MediatR;

namespace EmployeeControl.Application.Features.CategoryAbsences.Queries.GetCategoryAbsencePaginated;

internal class GetCategoryAbsencePaginatedHandler(IApplicationDbContext context, IMapper mapper)
    : IRequestHandler<GetCategoryAbsencePaginatedQuery, ResponseData<GetCategoryAbsencePaginatedResponse>>
{
    public async Task<ResponseData<GetCategoryAbsencePaginatedResponse>> Handle(
        GetCategoryAbsencePaginatedQuery request,
        CancellationToken cancellationToken)
    {
        var categoryAbsences = context.CategoryAbsences;
        var resultResponse = await ResponseData<GetCategoryAbsencePaginatedResponse>.CreateAsync(
            categoryAbsences,
            request.RequestData,
            mapper,
            cancellationToken);

        return resultResponse;
    }
}
