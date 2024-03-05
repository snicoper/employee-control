using AutoMapper;
using EmployeeControl.Application.Common.EntityFramework.Filter;
using EmployeeControl.Application.Common.EntityFramework.OrderBy;
using Microsoft.EntityFrameworkCore;

namespace EmployeeControl.Application.Common.Models;

public class ResponseData<TResponse> : RequestData
    where TResponse : class
{
    public IEnumerable<TResponse> Items { get; private init; } = new List<TResponse>();

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    public static async Task<ResponseData<TResponse>> CreateAsync<TEntity>(
        IQueryable<TEntity> source,
        RequestData request,
        IMapper mapper,
        CancellationToken cancellationToken)
        where TEntity : class?
    {
        var totalItems = await source
            .Filter(request)
            .Ordering(request)
            .CountAsync(cancellationToken);

        var items = await source
            .Filter(request)
            .Ordering(request)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var totalPages = (int)Math.Ceiling(totalItems / (double)request.PageSize);

        var responseData = new ResponseData<TResponse>
        {
            TotalItems = totalItems,
            PageNumber = request.PageNumber,
            TotalPages = totalPages,
            Ratio = request.Ratio,
            PageSize = request.PageSize,
            Items = mapper.Map<List<TResponse>>(items),
            Orders = request.Orders,
            Filters = request.Filters
        };

        return responseData;
    }
}
